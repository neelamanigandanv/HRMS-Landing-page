import fs from 'fs';
import path from 'path';

function walk(dir, extList) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(walk(full, extList));
    else if (!extList || extList.some(ext => file.endsWith(ext))) results.push(full);
  });
  return results;
}

const srcFiles = walk('src', ['.ts', '.tsx', '.css', '.html']).concat(['index.html', 'scripts/prerender.cjs']);
console.log('Total files to scan for references:', srcFiles.length);

const imgDir = 'public/images';
const images = fs.readdirSync(imgDir);

const usageMap = {};
images.forEach(img => {
  usageMap[img] = [];
  srcFiles.forEach(sf => {
    const content = fs.readFileSync(sf, 'utf8');
    if (content.includes(img)) {
      usageMap[img].push(sf);
    }
  });
});

let referencedCount = 0;
let unreferencedCount = 0;
const unreferenced = [];

Object.entries(usageMap).forEach(([img, files]) => {
  if (files.length > 0) {
    referencedCount++;
  } else {
    unreferencedCount++;
    unreferenced.push(img);
  }
});

console.log('Referenced images:', referencedCount);
console.log('Unreferenced images in public/images:', unreferencedCount);
if (unreferenced.length > 0) {
  console.log('Unreferenced list:', unreferenced);
}

