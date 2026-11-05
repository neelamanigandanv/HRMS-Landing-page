const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(walk(full));
    else results.push(full);
  });
  return results;
}

function getDirStats(dir) {
  const files = walk(dir);
  const totalBytes = files.reduce((acc, f) => acc + fs.statSync(f).size, 0);
  return {
    fileCount: files.length,
    bytes: totalBytes,
    sizeMB: (totalBytes / 1024 / 1024).toFixed(2),
    sizeKB: (totalBytes / 1024).toFixed(1)
  };
}

const publicStats = getDirStats('public');
const distStats = getDirStats('dist');
const ogFiles = fs.readdirSync('public/og').map(f => {
  const p = path.join('public/og', f);
  const s = fs.statSync(p).size;
  return {
    name: f,
    sizeKB: (s / 1024).toFixed(1) + ' KB',
    bytes: s
  };
}).sort((a,b) => b.bytes - a.bytes);

console.log('=== DIRECTORY STATS ===');
console.log('public/ folder:', publicStats.fileCount, 'files |', publicStats.sizeMB, 'MB (' + publicStats.bytes + ' bytes)');
console.log('dist/ folder:', distStats.fileCount, 'files |', distStats.sizeMB, 'MB (' + distStats.bytes + ' bytes)');

console.log('\n=== OG FILES (in public/og/ and dist/og/) ===');
console.table(ogFiles);

// Sample og:image values
function extractOgImage(filePath) {
  const c = fs.readFileSync(filePath, 'utf8');
  const m = c.match(/<meta property="og:image" content="([^"]+)"/i);
  return m ? m[1] : 'NONE';
}

console.log('\n=== SAMPLE OG:IMAGE VALUES IN DIST HTML ===');
console.log('Home (/):', extractOgImage('dist/index.html'));
console.log('FAQ (/faq):', extractOgImage('dist/faq/index.html'));
console.log('Blog 1 (/blog/biometrics-vs-geofenced-mobile-tracking):', extractOgImage('dist/blog/biometrics-vs-geofenced-mobile-tracking/index.html'));
console.log('Blog 2 (/blog/statutory-payroll-compliance-guide-2025):', extractOgImage('dist/blog/statutory-payroll-compliance-guide-2025/index.html'));
console.log('Blog 3 (/blog/evaluating-hrms-for-multi-branch-businesses):', extractOgImage('dist/blog/evaluating-hrms-for-multi-branch-businesses/index.html'));

