const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];

  // Check 1: No localhost or 127.0.0.1 anywhere
  if (content.includes('localhost') || content.includes('127.0.0.1')) {
    const idx = content.includes('localhost') ? content.indexOf('localhost') : content.indexOf('127.0.0.1');
    errors.push(`Found localhost/127.0.0.1: "...${content.slice(Math.max(0, idx - 30), idx + 50)}..."`);
  }

  // Check 2: No website URL http://zentilos.com or https://zentilos.com
  if (content.includes('https://zentilos.com') || content.includes('http://zentilos.com')) {
    const idx = content.includes('https://zentilos.com') ? content.indexOf('https://zentilos.com') : content.indexOf('http://zentilos.com');
    errors.push(`Found zentilos.com domain URL: "...${content.slice(Math.max(0, idx - 30), idx + 50)}..."`);
  }

  // Check 3: Sitemap and Robots check
  if (filePath.endsWith('sitemap.xml') || filePath.endsWith('robots.txt')) {
    if (content.includes('zentilos.com')) {
      errors.push(`Found zentilos.com in sitemap or robots.txt`);
    }
  }

  return errors;
}

function scanDir(dir) {
  let totalFiles = 0;
  let allErrors = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      const res = scanDir(full);
      totalFiles += res.totalFiles;
      allErrors = allErrors.concat(res.allErrors);
    } else if (/\.(html|xml|txt)$/.test(ent.name)) {
      totalFiles++;
      const errs = checkFile(full);
      if (errs.length > 0) {
        allErrors.push({ file: full, errs });
      }
    }
  }
  return { totalFiles, allErrors };
}

const { totalFiles, allErrors } = scanDir('dist');
console.log(`Scanned ${totalFiles} static files in dist/.`);
console.log(`Total URL issues found: ${allErrors.length}`);
if (allErrors.length > 0) {
  console.log(JSON.stringify(allErrors, null, 2));
} else {
  console.log('✔ 100% PASSED: ZERO occurrences of localhost and ZERO occurrences of zentilos.com as website URLs in dist/ when VITE_SITE_URL=https://example.com!');
}
