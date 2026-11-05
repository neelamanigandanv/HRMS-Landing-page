import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve('public/images');
const BACKUP_DIR = path.resolve('image-originals');

// Kept originals per requirement 4:
// og:image, twitter:image, favicon, apple-touch-icon, and JSON-LD images
const KEPT_ORIGINALS = new Set([
  'hero-plum-dashboard-showcase.jpg', // site-wide og:image & twitter:image default in src/config/seo.ts
  'branch-biometric.jpg',             // blog post og:image in src/data/blogData.ts
  'article-payroll.jpg',              // blog post og:image in src/data/blogData.ts
  'article-multibranch.jpg',          // blog post og:image in src/data/blogData.ts
  'article-onboarding.jpg',           // blog post og:image in src/data/blogData.ts
  'solution-enterprise.jpg',          // blog post og:image in src/data/blogData.ts
  'solution-small-business.jpg',      // blog post og:image in src/data/blogData.ts
  'solution-mid-sized.jpg',           // blog post og:image in src/data/blogData.ts
  'industry-tech.jpg',                // blog post og:image in src/data/blogData.ts
  'resource-hub-card.jpg',            // blog post og:image in src/data/blogData.ts
]);

function walk(dir, extList) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full, extList));
    } else if (!extList || extList.some(ext => file.endsWith(ext))) {
      results.push(full);
    }
  });
  return results;
}

async function run() {
  console.log('=== Starting Phase 1 Image Optimization (WebP Conversion) ===\n');

  // Verify backup directory exists
  if (!fs.existsSync(BACKUP_DIR)) {
    console.error('Error: image-originals/ backup directory not found!');
    process.exit(1);
  }

  const allFiles = fs.readdirSync(IMAGES_DIR);
  const converted = [];
  const kept = [];
  const largerWebp = [];
  const svgs = [];

  for (const filename of allFiles) {
    const filePath = path.join(IMAGES_DIR, filename);
    const ext = path.extname(filename).toLowerCase();

    if (ext === '.svg') {
      svgs.push(filename);
      continue;
    }

    if (KEPT_ORIGINALS.has(filename)) {
      kept.push({
        filename,
        reason: 'Kept original JPG for og:image / twitter:image (social scraper compatibility)'
      });
      continue;
    }

    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      continue;
    }

    const originalStat = fs.statSync(filePath);
    const originalBytes = originalStat.size;

    // Convert with sharp preserving dimensions and alpha
    const image = sharp(filePath);
    const metadata = await image.metadata();

    let webpBuffer;
    if (ext === '.png' && metadata.hasAlpha) {
      webpBuffer = await image.webp({ quality: 80, alphaQuality: 80 }).toBuffer();
    } else {
      webpBuffer = await image.webp({ quality: 80 }).toBuffer();
    }

    const webpBytes = webpBuffer.length;

    // If WebP is larger than original, keep the original
    if (webpBytes >= originalBytes) {
      largerWebp.push({
        filename,
        originalBytes,
        webpBytes
      });
      continue;
    }

    const webpFilename = filename.replace(/\.(jpe?g|png)$/i, '.webp');
    const webpPath = path.join(IMAGES_DIR, webpFilename);

    fs.writeFileSync(webpPath, webpBuffer);

    converted.push({
      original: filename,
      webp: webpFilename,
      originalBytes,
      webpBytes,
      reduction: ((1 - webpBytes / originalBytes) * 100).toFixed(1) + '%'
    });
  }

  console.log(`Conversion completed:`);
  console.log(`- Total converted to WebP: ${converted.length}`);
  console.log(`- Kept originals (OG/Twitter/JSON-LD): ${kept.length}`);
  console.log(`- Kept because WebP was larger: ${largerWebp.length}`);
  console.log(`- SVGs untouched: ${svgs.length}`);

  // Sort converted list by original filename length descending to prevent partial substring replace issues
  converted.sort((a, b) => b.original.length - a.original.length);

  // Update references in source code, css, html, scripts
  console.log('\nUpdating references across codebase...');
  const targetFiles = walk('src', ['.ts', '.tsx', '.css', '.json'])
    .concat(['index.html', 'scripts/prerender.cjs']);

  let totalReplacements = 0;
  const modifiedFiles = new Set();

  for (const targetFile of targetFiles) {
    let content = fs.readFileSync(targetFile, 'utf8');
    let fileChanged = false;

    for (const item of converted) {
      if (content.includes(item.original)) {
        // Replace exact filename occurrences
        const regex = new RegExp(item.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        content = content.replace(regex, item.webp);
        fileChanged = true;
        totalReplacements++;
      }
    }

    if (fileChanged) {
      fs.writeFileSync(targetFile, content, 'utf8');
      modifiedFiles.add(targetFile);
    }
  }

  console.log(`Updated ${totalReplacements} image references across ${modifiedFiles.size} files.`);

  // Remove converted originals from public/images
  console.log('\nRemoving converted original files from public/images...');
  for (const item of converted) {
    const originalPath = path.join(IMAGES_DIR, item.original);
    if (fs.existsSync(originalPath)) {
      fs.unlinkSync(originalPath);
    }
  }

  // Save report data
  const report = {
    convertedCount: converted.length,
    keptCount: kept.length,
    largerWebpCount: largerWebp.length,
    svgsCount: svgs.length,
    converted,
    kept,
    largerWebp,
    modifiedFiles: Array.from(modifiedFiles)
  };

  fs.writeFileSync('scripts/conversion-report.json', JSON.stringify(report, null, 2), 'utf8');
  console.log('Conversion report saved to scripts/conversion-report.json');
}

run().catch(err => {
  console.error('Fatal error during conversion:', err);
  process.exit(1);
});

