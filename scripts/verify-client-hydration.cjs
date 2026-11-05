const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');
const puppeteer = require('puppeteer-core');

const DIST_DIR = path.resolve(__dirname, '../dist');

function findChrome() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const c = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ];
  for (const p of c) if (fs.existsSync(p)) return p;
  return null;
}

function startPrerenderedServer(port = 0) {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
  };

  const server = http.createServer((req, res) => {
    let cleanPath = decodeURI(req.url.split('?')[0]);
    let target = path.join(DIST_DIR, cleanPath);

    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      target = path.join(target, 'index.html');
    }

    if (fs.existsSync(target) && fs.statSync(target).isFile()) {
      const ext = path.extname(target).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      return res.end(fs.readFileSync(target));
    }

    res.writeHead(404);
    res.end('Not found');
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      resolve({ server, port: server.address().port });
    });
  });
}

async function run() {
  const chromePath = findChrome();
  if (!chromePath) throw new Error('Chrome not found');

  const { server, port } = await startPrerenderedServer();
  console.log(`Server serving static prerendered files on http://127.0.0.1:${port}`);

  const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zentilos-hyd-'));
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    userDataDir: tempUserDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const testRoutes = [
    '/faq',
    '/features/payroll-management',
    '/blog/rotational-roster-management-guide',
  ];

  for (const route of testRoutes) {
    const page = await browser.newPage();
    console.log(`\n========================================`);
    console.log(`Testing Client Hydration on: ${route}`);
    console.log(`========================================`);

    // 1. Intercept before scripts run: verify prerendered static tags
    await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'domcontentloaded' });
    
    // Wait for full React hydration & useEffect execution
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 1000));

    const check = await page.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('title')).map((t) => t.textContent);
      const descriptions = Array.from(document.querySelectorAll('meta[name="description"]')).map((m) => m.getAttribute('content'));
      const canonicals = Array.from(document.querySelectorAll('link[rel="canonical"]')).map((l) => l.getAttribute('href'));
      const robots = Array.from(document.querySelectorAll('meta[name="robots"]')).map((m) => m.getAttribute('content'));
      const jsonLds = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((s) => s.textContent);

      return {
        titleCount: titles.length,
        titles,
        descriptionCount: descriptions.length,
        descriptions,
        canonicalCount: canonicals.length,
        canonicals,
        robotsCount: robots.length,
        robots,
        jsonLdCount: jsonLds.length,
        jsonLdValid: jsonLds.map(s => {
          try {
            const parsed = JSON.parse(s);
            const graph = parsed['@graph'] || [parsed];
            return graph.map(item => item['@type']);
          } catch (e) {
            return 'PARSE_ERROR';
          }
        }),
      };
    });

    console.log(`Titles found (${check.titleCount}):`, check.titles);
    console.log(`Descriptions found (${check.descriptionCount}):`, check.descriptions);
    console.log(`Canonicals found (${check.canonicalCount}):`, check.canonicals);
    console.log(`Robots tags found (${check.robotsCount}):`, check.robots);
    console.log(`JSON-LD blocks found (${check.jsonLdCount}):`, check.jsonLdValid);

    if (check.titleCount !== 1) throw new Error(`Expected exactly 1 title on ${route}, found ${check.titleCount}`);
    if (check.descriptionCount !== 1) throw new Error(`Expected exactly 1 meta description on ${route}, found ${check.descriptionCount}`);
    if (check.canonicalCount !== 1) throw new Error(`Expected exactly 1 canonical link on ${route}, found ${check.canonicalCount}`);
    if (check.robotsCount !== 1) throw new Error(`Expected exactly 1 meta robots on ${route}, found ${check.robotsCount}`);
    if (check.jsonLdCount !== 1) throw new Error(`Expected exactly 1 JSON-LD script on ${route}, found ${check.jsonLdCount}`);

    console.log(`✔ PASS: Single set of tags verified post-hydration on ${route}`);
    await page.close();
  }

  await browser.close();
  server.close();
  try {
    fs.rmSync(tempUserDataDir, { recursive: true, force: true });
  } catch {}
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

