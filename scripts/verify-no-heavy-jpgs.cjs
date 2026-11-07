const fs = require('fs');
const path = require('path');

function walk(d) {
  let r = [];
  fs.readdirSync(d).forEach(f => {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) r = r.concat(walk(p));
    else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css') || f.endsWith('.html') || f.endsWith('.json')) r.push(p);
  });
  return r;
}

const all = walk('src').concat(['index.html']);
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

let nonOgOccurrences = 0;
let ogOccurrences = 0;

list.forEach(jpgName => {
  all.forEach(file => {
    const c = fs.readFileSync(file, 'utf8');
    if (c.includes(jpgName)) {
      const lines = c.split('\n');
      lines.forEach((l, idx) => {
        if (l.includes(jpgName)) {
          const isOg = l.includes('/og/' + jpgName);
          if (isOg) {
            ogOccurrences++;
            console.log(`[OG OK] ${file}:${idx + 1} -> ${l.trim()}`);
          } else {
            nonOgOccurrences++;
            console.error(`[NON-OG VIOLATION] ${file}:${idx + 1} -> ${l.trim()}`);
          }
        }
      });
    }
  });
});

console.log(`\nScan Complete:`);
console.log(`- Valid /og/ references: ${ogOccurrences}`);
console.log(`- Non-og references to removed JPGs: ${nonOgOccurrences}`);

if (nonOgOccurrences > 0) {
  console.error('FAIL: Found lingering non-og references to removed JPGs!');
  process.exit(1);
} else {
  console.log('PASS: Exactly 0 non-og references to the 10 removed JPGs remain across src/ and CSS!');
}

