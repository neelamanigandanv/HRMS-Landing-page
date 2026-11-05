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

const distFiles = walk('dist');
let totalDistBytes = 0;
distFiles.forEach(f => totalDistBytes += fs.statSync(f).size);

const imgDir = 'public/images';
const imgFiles = fs.readdirSync(imgDir).map(f => {
  const p = path.join(imgDir, f);
  const s = fs.statSync(p).size;
  return { name: f, bytes: s, sizeKB: (s / 1024).toFixed(1), ext: path.extname(f).toLowerCase() };
});

const totalImgBytes = imgFiles.reduce((acc, f) => acc + f.bytes, 0);

console.log('=== BASELINE STATS ===');
console.log('Total dist files:', distFiles.length);
console.log('Total dist size:', (totalDistBytes / (1024 * 1024)).toFixed(2), 'MB (' + totalDistBytes + ' bytes)');
console.log('Total public/images files:', imgFiles.length);
console.log('Total public/images size:', (totalImgBytes / (1024 * 1024)).toFixed(2), 'MB (' + totalImgBytes + ' bytes)');

console.log('\nTop 10 largest images before:');
imgFiles.sort((a,b) => b.bytes - a.bytes).slice(0, 10).forEach((f, i) => {
  console.log(`${i+1}. ${f.name} - ${f.sizeKB} KB (${(f.bytes/1024/1024).toFixed(2)} MB)`);
});

fs.writeFileSync('scripts/baseline-data.json', JSON.stringify({
  totalDistFiles: distFiles.length,
  totalDistBytes,
  totalImgFiles: imgFiles.length,
  totalImgBytes,
  top10Images: imgFiles.slice(0, 10)
}, null, 2));

