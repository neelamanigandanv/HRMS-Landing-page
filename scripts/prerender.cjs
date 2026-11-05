/**
 * Static Prerendering (SSG) Engine for Zentilos.
 * Powered by puppeteer-core & native Chrome/Chromium.
 *
 * Capabilities:
 * - Detects Chrome across Windows, macOS, Linux or reads CHROME_PATH / PUPPETEER_EXECUTABLE_PATH.
 * - Skips gracefully without failing build if no Chrome binary is found.
 * - Concurrently renders static HTML for every public route, including dynamic blog & guide slugs.
 * - Enforces data-prerender-ready signal and validates metadata (title, canonical, robots, JSON-LD, body).
 * - Generates unified sitemap.xml and robots.txt using VITE_SITE_URL, excluding all noindex routes.
 * - Generates dist/404.html for static hosting fallback.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');
const puppeteer = require('puppeteer-core');

const DIST_DIR = path.resolve(__dirname, '../dist');
const PROJECT_ROOT = path.resolve(__dirname, '..');

// 1. Detect Chrome / Chromium executable
function sanitizeSiteUrl(raw) {
  if (!raw || typeof raw !== 'string') return '';
  return raw.trim().replace(/^['"]|['"]$/g, '').trim().replace(/\/+$/, '');
}

function resolveSiteUrl() {
  if (process.env.VITE_SITE_URL) {
    const cleaned = sanitizeSiteUrl(process.env.VITE_SITE_URL);
    if (cleaned) return cleaned;
  }
  // Try loading from .env.production
  const prodEnvPath = path.join(PROJECT_ROOT, '.env.production');
  if (fs.existsSync(prodEnvPath)) {
    const content = fs.readFileSync(prodEnvPath, 'utf8');
    const match = content.match(/^VITE_SITE_URL\s*=\s*(.*)$/m);
    if (match) {
      const cleaned = sanitizeSiteUrl(match[1]);
      if (cleaned) return cleaned;
    }
  }
  // Try loading from .env
  const devEnvPath = path.join(PROJECT_ROOT, '.env');
  if (fs.existsSync(devEnvPath)) {
    const content = fs.readFileSync(devEnvPath, 'utf8');
    const match = content.match(/^VITE_SITE_URL\s*=\s*(.*)$/m);
    if (match) {
      const cleaned = sanitizeSiteUrl(match[1]);
      if (cleaned) return cleaned;
    }
  }
  return 'http://localhost:5173';
}

function findChromeExecutable() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const platform = process.platform;
  const candidates = [];

  if (platform === 'win32') {
    candidates.push(
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Google\\Chrome\\Application\\chrome.exe') : null,
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
    );
  } else if (platform === 'darwin') {
    candidates.push(
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
    );
  } else {
    candidates.push(
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/snap/bin/chromium'
    );
  }

  for (const p of candidates) {
    if (p && fs.existsSync(p)) {
      return p;
    }
  }

  return null;
}

// 2. Extract dynamic routes from data files
function getDynamicRoutes() {
  const blogFile = fs.readFileSync(path.join(PROJECT_ROOT, 'src/data/blogData.ts'), 'utf8');
  const blogSlugs = [...new Set([...blogFile.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]))];

  const guidesFile = fs.readFileSync(path.join(PROJECT_ROOT, 'src/data/guidesData.ts'), 'utf8');
  const guideSlugs = [...new Set([...guidesFile.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]))];

  const careersFile = fs.readFileSync(path.join(PROJECT_ROOT, 'src/data/careersData.ts'), 'utf8');
  // Match only actual job opening ids (after the initial culture perk definitions)
  const jobMatches = [...careersFile.matchAll(/id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*department:/g)];
  const jobIds = jobMatches.map(m => m[1]);

  return {
    blogRoutes: blogSlugs.map(s => `/blog/${s}`),
    guideRoutes: guideSlugs.map(s => `/guides/${s}`),
    jobRoutes: jobIds.map(id => `/careers/${id}`),
  };
}

// 3. Static routes definition
const STATIC_INDEXABLE_ROUTES = [
  '/',
  '/product',
  '/solutions',
  '/solutions/small-businesses',
  '/solutions/mid-sized-businesses',
  '/solutions/enterprises',
  '/solutions/industries',
  '/solutions/hr-teams',
  '/solutions/finance-teams',
  '/features/employee-management',
  '/features/attendance-management',
  '/features/leave-management',
  '/features/payroll-management',
  '/features/asset-management',
  '/features/recruitment',
  '/features/documents-compliance',
  '/features/performance-management',
  '/features/roles-permissions',
  '/features/reports-analytics',
  '/resources',
  '/faq',
  '/help',
  '/support',
  '/support/help-center',
  '/support/employee-help',
  '/about',
  '/contact',
  '/request-demo',
  '/careers',
  '/partners',
  '/security',
  '/terms-of-service',
  '/guides',
  '/blog',
  '/glossary',
  '/api-documentation',
  '/privacy-policy',
  '/cookie-policy',
  '/data-processing-agreement',
  '/sitemap',
  '/contact-sales',
];

const STATIC_NOINDEX_ROUTES = [
  '/thank-you',
  '/support/search',
  '/support/track',
  '/case-studies',
];

// 4. Lightweight static HTTP server serving the pristine SPA shell in memory
function startStaticServer(port = 0) {
  let rawTemplate = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
  const SPA_TEMPLATE = rawTemplate
    .replace(/\s+data-prerender-ready="true"/g, '')
    .replace(/(<div id="root">)[\s\S]*?(<\/div>)/, '$1$2');

  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
  };

  const server = http.createServer((req, res) => {
    const rawPath = decodeURI(req.url.split('?')[0]);
    const filePath = path.join(DIST_DIR, rawPath);
    const ext = path.extname(rawPath).toLowerCase();

    // If it's an asset with a file extension on disk, serve it with proper MIME type
    if (ext && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      return res.end(data);
    }

    // Otherwise, route requests are served the pristine client SPA template
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(SPA_TEMPLATE);
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      const actualPort = server.address().port;
      resolve({ server, port: actualPort });
    });
  });
}

// 5. Generate sitemap.xml
function generateSitemap(routes, siteUrl) {
  const cleanSiteUrl = (siteUrl || 'http://localhost:5173').replace(/\/+$/, '');
  const xmlEntries = routes.map((route) => {
    const loc = route === '/' ? `${cleanSiteUrl}/` : `${cleanSiteUrl}${route}`;
    const priority = route === '/' ? '1.0' : route.startsWith('/features') || route.startsWith('/solutions') ? '0.8' : '0.7';
    const changefreq = route === '/' || route === '/blog' ? 'weekly' : 'monthly';
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries.join('\n')}\n</urlset>\n`;
}

// 6. Generate robots.txt
function generateRobotsTxt(siteUrl) {
  const cleanSiteUrl = (siteUrl || 'http://localhost:5173').replace(/\/+$/, '');
  return `# Zentilos robots.txt
# Generated at build time from route registry

User-agent: *
Allow: /

# Dedicated AI & LLM Crawlers
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${cleanSiteUrl}/sitemap.xml
`;
}

// 7. Prerender main execution
async function main() {
  const startTime = Date.now();
  console.log('🚀 [Zentilos Prerender] Starting static HTML generation (SSG)...');

  // Verify dist/ exists
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ [Zentilos Prerender] dist/ directory not found. Please run "vite build" first.');
    process.exit(1);
  }

  // Detect Chrome binary
  const chromePath = findChromeExecutable();
  if (!chromePath) {
    console.warn('\n⚠️  [Zentilos Prerender] No Google Chrome or Chromium executable found on this environment.');
    console.warn('ℹ️  Skipping static prerendering step. The Vite client SPA build in "dist/" is preserved.');
    console.warn('ℹ️  To enable prerendering, set CHROME_PATH environment variable (e.g. export CHROME_PATH=/path/to/chrome).\n');
    process.exit(0);
  }
  console.log(`🔍 [Zentilos Prerender] Found browser executable: ${chromePath}`);

  // Resolve base site URL from env
  const siteUrl = resolveSiteUrl();
  console.log(`🌐 [Zentilos Prerender] Target Site URL: ${siteUrl}`);

  if (!siteUrl || siteUrl.includes('localhost') || siteUrl.includes('127.0.0.1')) {
    console.warn('\n================================================================');
    console.warn('⚠️  [Zentilos Prerender Warning] VITE_SITE_URL is missing or set to localhost:');
    console.warn(`    Current Site URL: ${siteUrl}`);
    console.warn('    Static HTML, sitemap.xml, robots.txt, and JSON-LD will reference localhost.');
    console.warn('    To configure a production domain, set VITE_SITE_URL in .env.production');
    console.warn('    or pass it via environment variable: VITE_SITE_URL=https://your-domain.com');
    console.warn('================================================================\n');
  }

  // Collect routes
  const { blogRoutes, guideRoutes, jobRoutes } = getDynamicRoutes();
  console.log(`📄 [Zentilos Prerender] Discovered dynamic routes: ${blogRoutes.length} blog posts, ${guideRoutes.length} guides, ${jobRoutes.length} job openings.`);

  const indexableRoutes = [
    ...STATIC_INDEXABLE_ROUTES,
    ...blogRoutes,
    ...guideRoutes,
  ];

  // Job pages are mock/placeholder -> marked noindex and excluded from sitemap per Condition 4
  const noindexRoutes = [
    ...STATIC_NOINDEX_ROUTES,
    ...jobRoutes,
  ];

  const allRoutesToRender = [
    ...indexableRoutes,
    ...noindexRoutes,
  ];

  console.log(`📦 [Zentilos Prerender] Total routes to prerender: ${allRoutesToRender.length + 1} (including /404.html)`);

  // Start local server
  const { server, port } = await startStaticServer();
  console.log(`⚡ [Zentilos Prerender] Local preview server running on port ${port}`);

  // Create isolated temp user data dir to prevent lock conflicts with existing running Chrome
  const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zentilos-ssg-'));

  // Launch browser with backgrounding flags disabled
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    userDataDir: tempUserDataDir,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--mute-audio',
      '--disable-background-networking',
      '--disable-extensions',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
    ],
  });

  const renderedOutputs = [];
  const errors = [];

  async function renderRoute(route, is404 = false) {
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1280, height: 800 });

      const targetUrl = is404
        ? `http://127.0.0.1:${port}/__non_existent_page_404_test__`
        : `http://127.0.0.1:${port}${route}`;

      await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Wait for the React Seo effect to complete and mark data-prerender-ready="true"
      await page.waitForSelector('html[data-prerender-ready="true"]', { timeout: 30000 });
      await page.waitForFunction(() => {
        const root = document.getElementById('root');
        return root && root.children.length > 0 && root.textContent.trim().length > 20;
      }, { timeout: 30000 });

      // Extract metadata for validation (Condition 3)
      const meta = await page.evaluate(() => {
        const title = document.title || '';
        const descEl = document.querySelector('meta[name="description"]');
        const desc = descEl ? descEl.getAttribute('content') : '';
        const canonEl = document.querySelector('link[rel="canonical"]');
        const canonical = canonEl ? canonEl.getAttribute('href') : '';
        const robotsEl = document.querySelector('meta[name="robots"]');
        const robots = robotsEl ? robotsEl.getAttribute('content') : '';
        const jsonLdEl = document.querySelector('script[type="application/ld+json"]');
        const jsonLd = jsonLdEl ? jsonLdEl.textContent : '';
        const rootEl = document.getElementById('root');
        const rootText = rootEl ? rootEl.textContent.trim() : '';
        const childCount = rootEl ? rootEl.children.length : 0;

        return {
          title,
          desc,
          canonical,
          robots,
          hasJsonLd: Boolean(jsonLd),
          jsonLdValid: (function() {
            if (!jsonLd) return false;
            try { JSON.parse(jsonLd); return true; } catch { return false; }
          })(),
          hasContent: rootText.length > 20 && childCount > 0,
          html: '<!doctype html>\n' + document.documentElement.outerHTML,
        };
      });

      // Assertions (Condition 3)
      if (!is404) {
        if (!meta.title || meta.title.trim().length === 0) {
          throw new Error(`Empty title on ${route}`);
        }
        if (!meta.canonical) {
          throw new Error(`Missing canonical link on ${route}`);
        }
        if (!meta.desc) {
          throw new Error(`Missing meta description on ${route}`);
        }
        if (!meta.robots) {
          throw new Error(`Missing meta robots on ${route}`);
        }
        if (!meta.hasJsonLd || !meta.jsonLdValid) {
          throw new Error(`Invalid or missing JSON-LD schema on ${route}`);
        }
      }
      if (!meta.hasContent) {
        throw new Error(`Blank or empty #root body on ${route}`);
      }

      // Determine target destination file
      let targetFile;
      if (is404) {
        targetFile = path.join(DIST_DIR, '404.html');
      } else if (route === '/') {
        targetFile = path.join(DIST_DIR, 'index.html');
      } else {
        const routePath = route.startsWith('/') ? route.slice(1) : route;
        targetFile = path.join(DIST_DIR, routePath, 'index.html');
      }

      renderedOutputs.push({ route: is404 ? '404' : route, targetFile, html: meta.html, title: meta.title });
      process.stdout.write(`✔ Prerendered: ${is404 ? '/404.html' : route}\n`);
    } finally {
      await page.close();
    }
  }

  async function renderRouteWithRetry(route, is404 = false, maxRetries = 2) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await renderRoute(route, is404);
        return;
      } catch (err) {
        if (attempt === maxRetries) {
          console.error(`❌ [Zentilos Prerender] Failed permanently on ${route}: ${err.message}`);
          errors.push({ route, error: err.message });
        } else {
          console.warn(`⚠️  [Zentilos Prerender] Retrying ${route} (attempt ${attempt + 1})...`);
        }
      }
    }
  }

  // Concurrently render pages with a concurrency limit of 2 for maximum stability
  const CONCURRENCY = 2;
  const queue = [...allRoutesToRender];

  async function worker() {
    while (queue.length > 0) {
      const r = queue.shift();
      if (!r) break;
      await renderRouteWithRetry(r);
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  // Render 404 fallback page (Condition 6)
  await renderRouteWithRetry('/404', true);

  // Close browser & server
  await browser.close();
  server.close();
  try {
    fs.rmSync(tempUserDataDir, { recursive: true, force: true });
  } catch {}

  if (errors.length > 0) {
    console.error(`\n❌ [Zentilos Prerender] Completed with ${errors.length} fatal error(s)!`);
    for (const e of errors) {
      console.error(`  - ${e.route}: ${e.error}`);
    }
    process.exit(1);
  }

  // Commit all rendered HTML files to disk
  console.log(`💾 [Zentilos Prerender] Writing ${renderedOutputs.length} static HTML files to dist/...`);
  const localOriginRegex = new RegExp(`http://(127\\.0\\.0\\.1|localhost):${port}`, 'g');
  for (const item of renderedOutputs) {
    fs.mkdirSync(path.dirname(item.targetFile), { recursive: true });
    const cleanHtml = item.html.replace(localOriginRegex, '');
    fs.writeFileSync(item.targetFile, cleanHtml, 'utf8');
  }

  // Generate sitemap.xml (Condition 4)
  const sitemapXml = generateSitemap(indexableRoutes, siteUrl);
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`🗺️  [Zentilos Prerender] Generated dist/sitemap.xml with ${indexableRoutes.length} indexable routes.`);

  // Generate robots.txt (Condition 4)
  const robotsTxt = generateRobotsTxt(siteUrl);
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf8');
  console.log(`🤖 [Zentilos Prerender] Generated dist/robots.txt referencing ${siteUrl}/sitemap.xml.`);

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✨ [Zentilos Prerender] Successfully generated ${renderedOutputs.length} static HTML files in ${duration}s!`);
}

main().catch((err) => {
  console.error('Fatal prerender failure:', err);
  process.exit(1);
});
