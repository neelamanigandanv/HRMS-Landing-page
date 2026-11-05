const fs = require('fs');
const path = require('path');

const report = JSON.parse(fs.readFileSync('scripts/conversion-report.json', 'utf8'));
const removedOriginals = report.converted.map(c => c.original);

// 10 heavy JPGs removed from public/images in Part B
const partBJpgs = [
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

console.log(`Checking for references to ${removedOriginals.length} Phase 1 removed originals + 10 Part B removed JPGs under /images/...`);

function walk(dir, extList) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      // Skip node_modules, .git, image-originals, .system_generated
      if (['node_modules', '.git', 'image-originals', '.system_generated'].includes(file)) return;
      results = results.concat(walk(full, extList));
    } else if (!extList || extList.some(ext => file.endsWith(ext))) {
      results.push(full);
    }
  });
  return results;
}

const checkTargets = [
  ...walk('src', ['.ts', '.tsx', '.css', '.json']),
  ...walk('public', ['.html', '.xml', '.txt']),
  ...walk('scripts', ['.cjs', '.mjs', '.js']).filter(f => !f.includes('conversion-report') && !f.includes('baseline-data') && !f.includes('verify-no-removed-images') && !f.includes('convert-images') && !f.includes('check-image-references')),
  ...walk('dist', ['.html', '.js', '.css', '.xml', '.txt']),
  'index.html'
];

console.log(`Total target files scanned: ${checkTargets.length}`);

let totalHits = 0;
const hitDetails = [];

checkTargets.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  removedOriginals.forEach(orig => {
    if (content.includes(orig)) {
      totalHits++;
      hitDetails.push({ file: filePath, removedFile: orig });
    }
  });

  // Check Part B JPGs under /images/
  partBJpgs.forEach(jpgName => {
    if (content.includes('images/' + jpgName)) {
      totalHits++;
      hitDetails.push({ file: filePath, removedFile: 'images/' + jpgName });
    }
  });
});

console.log(`Total hits for removed filenames: ${totalHits}`);

if (hitDetails.length > 0) {
  console.error('FAIL: Found references to removed files:');
  console.table(hitDetails.slice(0, 20));
  process.exit(1);
} else {
  console.log('PASS: Exactly 0 hits for removed image filenames across src/, public/, index.html, scripts/, and dist/!');
}
