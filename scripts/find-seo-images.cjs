const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(walk(full));
    else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.html') || file.endsWith('.cjs')) results.push(full);
  });
  return results;
}

const allFiles = walk('src').concat(['index.html']);

console.log('=== Checking SEO & JSON-LD image usages ===');

// Check seo.ts
const seoTs = fs.readFileSync('src/config/seo.ts', 'utf8');
console.log('src/config/seo.ts DEFAULT_OG_IMAGE matches:');
const ogMatches = seoTs.match(/DEFAULT_OG_IMAGE[^;]+/g);
if (ogMatches) console.log(ogMatches);

// Check Seo.tsx
const seoJsx = fs.readFileSync('src/components/seo/Seo.tsx', 'utf8');
console.log('\nsrc/components/seo/Seo.tsx image references:');
[...seoJsx.matchAll(/image[^,\n]+/gi)].forEach(m => console.log('  ', m[0]));

// Check index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');
console.log('\nindex.html icons and images:');
[...indexHtml.matchAll(/<(link|meta)[^>]+(icon|image)[^>]*>/gi)].forEach(m => console.log('  ', m[0]));

// Check JsonLd usages across all files
console.log('\nSearching for image in JSON-LD objects across src:');
allFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('JsonLd') || content.includes('schema') || content.includes('@context')) {
    const lines = content.split('\n');
    lines.forEach((l, idx) => {
      if (l.includes('image:') || l.includes('"image"') || l.includes('logo:') || l.includes('"logo"')) {
        console.log(`${f}:${idx+1} -> ${l.trim()}`);
      }
    });
  }
});

