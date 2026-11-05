const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(walk(full));
    else if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(full);
  });
  return results;
}

const files = walk('src');
console.log('=== Checking all <JsonLd schema={...}> props ===');

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('<JsonLd')) {
    const matches = [...c.matchAll(/<JsonLd\s+schema=\{([\s\S]*?)\}\s*\/>/g)];
    matches.forEach(m => {
      const schemaCode = m[1];
      if (schemaCode.includes('image') || schemaCode.includes('logo') || schemaCode.includes('.jpg') || schemaCode.includes('.png')) {
        console.log(`\n--- ${f} ---`);
        console.log(schemaCode);
      }
    });
  }
});

// Also check BlogPost.tsx and GuideDetailPage.tsx specifically
['src/pages/BlogPost.tsx', 'src/pages/GuideDetailPage.tsx'].forEach(f => {
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, 'utf8');
    const lines = c.split('\n');
    lines.forEach((l, idx) => {
      if (l.includes('schema') || l.includes('JsonLd') || l.includes('image')) {
        // if inside a schema object
        if (l.includes('image:') || l.includes('image: [') || l.includes('"image"')) {
          console.log(`Explicit check in ${f}:${idx+1} -> ${l.trim()}`);
        }
      }
    });
  }
});

