import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_ORIGINALS_DIR = path.resolve('image-originals');
const PUBLIC_IMAGES_DIR = path.resolve('public/images');
const PUBLIC_OG_DIR = path.resolve('public/og');

if (!fs.existsSync(PUBLIC_OG_DIR)) {
  fs.mkdirSync(PUBLIC_OG_DIR, { recursive: true });
}

const targetImages = [
  'industry-tech.jpg',
  'resource-hub-card.jpg',
  'branch-biometric.jpg',
  'article-multibranch.jpg',
  'article-payroll.jpg',
  'article-onboarding.jpg',
  'solution-enterprise.jpg',
  'solution-mid-sized.jpg',
  'solution-small-business.jpg',
  'hero-plum-dashboard-showcase.jpg'
];

async function run() {
  console.log('=== Starting Part B: WebP & OG Image Optimization ===\n');

  const webpResults = [];
  const ogResults = [];

  for (const filename of targetImages) {
    const origPath = path.join(IMAGES_ORIGINALS_DIR, filename);
    if (!fs.existsSync(origPath)) {
      console.error(`Error: original file not found: ${origPath}`);
      process.exit(1);
    }

    const origBytes = fs.statSync(origPath).size;
    const baseName = filename.replace(/\.jpg$/i, '');

    // 1. Generate .webp in public/images/ (quality 80, same pixel dimensions)
    const webpPath = path.join(PUBLIC_IMAGES_DIR, `${baseName}.webp`);
    const webpBuffer = await sharp(origPath)
      .webp({ quality: 80 })
      .toBuffer();

    fs.writeFileSync(webpPath, webpBuffer);
    webpResults.push({
      file: `${baseName}.webp`,
      origKB: (origBytes / 1024).toFixed(1),
      webpKB: (webpBuffer.length / 1024).toFixed(1),
      savings: ((1 - webpBuffer.length / origBytes) * 100).toFixed(1) + '%'
    });

    // 2. Generate smaller JPG in public/og/ (max width 1200px, progressive, quality 78, under 200 KB)
    const ogPath = path.join(PUBLIC_OG_DIR, `${baseName}.jpg`);
    const ogBuffer = await sharp(origPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true })
      .toBuffer();

    fs.writeFileSync(ogPath, ogBuffer);
    const ogMeta = await sharp(ogBuffer).metadata();
    ogResults.push({
      file: `${baseName}.jpg`,
      width: ogMeta.width,
      height: ogMeta.height,
      origKB: (origBytes / 1024).toFixed(1),
      ogKB: (ogBuffer.length / 1024).toFixed(1),
      savings: ((1 - ogBuffer.length / origBytes) * 100).toFixed(1) + '%'
    });

    // 3. Remove heavy original JPG from public/images/
    const publicJpgPath = path.join(PUBLIC_IMAGES_DIR, filename);
    if (fs.existsSync(publicJpgPath)) {
      fs.unlinkSync(publicJpgPath);
      console.log(`Removed heavy JPG from public/images/: ${filename}`);
    }
  }

  console.log('\n--- WebP Generation in public/images/ ---');
  console.table(webpResults);

  console.log('\n--- OG JPG Generation in public/og/ ---');
  console.table(ogResults);

  fs.writeFileSync('scripts/part-b-report.json', JSON.stringify({ webpResults, ogResults }, null, 2));
  console.log('\nReport written to scripts/part-b-report.json');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

