import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const list = [
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

async function test() {
  console.log('Testing optimization on the 10 images:');
  for (const f of list) {
    const origPath = path.join('image-originals', f);
    const origBytes = fs.statSync(origPath).size;
    const meta = await sharp(origPath).metadata();

    // 1. WebP (quality 80, same pixel dimensions)
    const webpBuf = await sharp(origPath)
      .webp({ quality: 80 })
      .toBuffer();

    // 2. OG JPG (max width 1200, progressive, quality 78)
    const ogBuf = await sharp(origPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true })
      .toBuffer();

    console.log(`\n${f} (${meta.width}x${meta.height}) - Original: ${(origBytes/1024).toFixed(1)} KB`);
    console.log(`  -> WebP: ${(webpBuf.length/1024).toFixed(1)} KB (-${((1 - webpBuf.length/origBytes)*100).toFixed(1)}%)`);
    console.log(`  -> OG JPG (max 1200w): ${(ogBuf.length/1024).toFixed(1)} KB (-${((1 - ogBuf.length/origBytes)*100).toFixed(1)}%)`);
  }
}

test();

