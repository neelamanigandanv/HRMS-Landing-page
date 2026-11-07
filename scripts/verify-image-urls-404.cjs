const fs = require('fs');
const path = require('path');
const http = require('http');

function walk(dir, extList) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full, extList));
    } else if (!extList || extList.some(ext => file.endsWith(ext))) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = walk('dist', ['.html']);
console.log(`Found ${htmlFiles.length} HTML files in dist/ to inspect for image URLs...`);

const imagePaths = new Set();

htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match src="/images/...", content=".../images/...", url(/images/...) as well as /og/...
  const matches = [...content.matchAll(/(?:\/(images|og)\/|http[s]?:\/\/[^/]+\/(images|og)\/)([a-zA-Z0-9_.-]+(?:\?[a-zA-Z0-9_=.-]+)?)/g)];
  matches.forEach(m => {
    const folder = m[1] || m[2];
    const cleanName = m[3].split('?')[0];
    imagePaths.add(`/${folder}/${cleanName}`);
  });
});

// Also check dist/assets/*.css for url(/images/...) and url(/og/...)
const cssFiles = walk('dist/assets', ['.css']);
cssFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = [...content.matchAll(/(?:\/(images|og)\/)([a-zA-Z0-9_.-]+(?:\?[a-zA-Z0-9_=.-]+)?)/g)];
  matches.forEach(m => {
    const folder = m[1];
    imagePaths.add(`/${folder}/${m[2].split('?')[0]}`);
  });
});

console.log(`Discovered ${imagePaths.size} unique image URLs (/images/ and /og/) referenced across prerendered HTML and CSS.\n`);

// Start a lightweight static server for dist
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let parsedUrl = req.url.split('?')[0];
  let filePath = path.join('dist', parsedUrl.replace(/^\//, ''));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(0, '127.0.0.1', async () => {
  const port = server.address().port;
  console.log(`Local test server running on http://127.0.0.1:${port}`);

  const sortedImages = Array.from(imagePaths).sort();
  let failed = 0;
  let passed = 0;

  for (const imgPath of sortedImages) {
    const url = `http://127.0.0.1:${port}${imgPath}`;
    const statusCode = await new Promise((resolve) => {
      http.get(url, (res) => {
        resolve(res.statusCode);
      }).on('error', () => resolve(500));
    });

    if (statusCode === 200) {
      passed++;
    } else {
      console.error(`❌ HTTP ${statusCode} for image: ${imgPath}`);
      failed++;
    }
  }

  console.log(`\nVerification Summary:`);
  console.log(`✔ Passed (HTTP 200): ${passed} images`);
  console.log(`❌ Failed (404/error): ${failed} images`);

  server.close();

  if (failed > 0) {
    console.error(`FAIL: ${failed} image references returned 404!`);
    process.exit(1);
  } else {
    console.log(`\n🎉 PASS: 100% of image and og URLs found in prerendered HTML returned HTTP 200 with NO 404s!`);
    process.exit(0);
  }
});

