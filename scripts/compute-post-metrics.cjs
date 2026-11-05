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

const baseline = JSON.parse(fs.readFileSync('scripts/baseline-data.json', 'utf8'));

const distFiles = walk('dist');
let currentDistBytes = 0;
distFiles.forEach(f => currentDistBytes += fs.statSync(f).size);

const imgDir = 'public/images';
const currentImgFiles = fs.readdirSync(imgDir).map(f => {
  const p = path.join(imgDir, f);
  const s = fs.statSync(p).size;
  return { name: f, bytes: s, sizeKB: (s / 1024).toFixed(1), ext: path.extname(f).toLowerCase() };
});

const currentImgBytes = currentImgFiles.reduce((acc, f) => acc + f.bytes, 0);

console.log('=== BEFORE / AFTER COMPARISON ===');
console.log('Images Count Before:', baseline.totalImgFiles);
console.log('Images Count After:', currentImgFiles.length);
console.log('Images Size Before:', (baseline.totalImgBytes / 1024 / 1024).toFixed(2), 'MB (' + baseline.totalImgBytes + ' bytes)');
console.log('Images Size After:', (currentImgBytes / 1024 / 1024).toFixed(2), 'MB (' + currentImgBytes + ' bytes)');
console.log('Images Size Reduction:', ((1 - currentImgBytes / baseline.totalImgBytes) * 100).toFixed(1) + '% (saved ' + ((baseline.totalImgBytes - currentImgBytes) / 1024 / 1024).toFixed(2) + ' MB)');

console.log('\nDist Size Before:', (baseline.totalDistBytes / 1024 / 1024).toFixed(2), 'MB (' + baseline.totalDistBytes + ' bytes)');
console.log('Dist Size After:', (currentDistBytes / 1024 / 1024).toFixed(2), 'MB (' + currentDistBytes + ' bytes)');
console.log('Dist Size Reduction:', ((1 - currentDistBytes / baseline.totalDistBytes) * 100).toFixed(1) + '% (saved ' + ((baseline.totalDistBytes - currentDistBytes) / 1024 / 1024).toFixed(2) + ' MB)');

console.log('\nTop 10 Largest Images After:');
currentImgFiles.sort((a,b) => b.bytes - a.bytes).slice(0, 10).forEach((f, i) => {
  console.log(`${i+1}. ${f.name} - ${f.sizeKB} KB (${(f.bytes/1024/1024).toFixed(2)} MB)`);
});

