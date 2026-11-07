const fs = require('fs');
const path = require('path');

const targetRoutes = [
  { name: 'Home (/)', path: 'dist/index.html' },
  { name: 'FAQ (/faq)', path: 'dist/faq/index.html' },
  { name: 'Blog: biometrics-vs-geofenced-mobile-tracking', path: 'dist/blog/biometrics-vs-geofenced-mobile-tracking/index.html' },
  { name: 'Blog: statutory-payroll-compliance-guide-2025', path: 'dist/blog/statutory-payroll-compliance-guide-2025/index.html' },
  { name: 'Blog: evaluating-hrms-for-multi-branch-businesses', path: 'dist/blog/evaluating-hrms-for-multi-branch-businesses/index.html' },
  { name: 'Blog: streamlined-onboarding-cuts-new-hire-turnover', path: 'dist/blog/streamlined-onboarding-cuts-new-hire-turnover/index.html' },
  { name: 'Blog: continuous-feedback-vs-annual-reviews', path: 'dist/blog/continuous-feedback-vs-annual-reviews/index.html' },
  { name: 'Blog: why-spreadsheet-payroll-fails-scaling-startups', path: 'dist/blog/why-spreadsheet-payroll-fails-scaling-startups/index.html' },
  { name: 'Blog: rotational-roster-management-guide', path: 'dist/blog/rotational-roster-management-guide/index.html' },
  { name: 'Blog: hidden-costs-of-legacy-hr-software', path: 'dist/blog/hidden-costs-of-legacy-hr-software/index.html' },
  { name: 'Blog: building-trust-with-employee-self-service', path: 'dist/blog/building-trust-with-employee-self-service/index.html' },
];

console.log('=== Verifying og:image in Prerendered dist/ HTML ===\n');

let failed = 0;
const results = [];

for (const route of targetRoutes) {
  if (!fs.existsSync(route.path)) {
    console.error(`❌ HTML file does not exist: ${route.path}`);
    failed++;
    continue;
  }

  const html = fs.readFileSync(route.path, 'utf8');
  const match = html.match(/<meta property="og:image" content="([^"]+)"/i);
  if (!match) {
    console.error(`❌ Missing og:image tag in: ${route.name}`);
    failed++;
    continue;
  }

  const ogUrl = match[1];
  // Extract pathname from full URL
  const parsed = new URL(ogUrl);
  const localFilePath = path.join('dist', parsed.pathname.replace(/^\//, ''));
  const fileExists = fs.existsSync(localFilePath) && fs.statSync(localFilePath).isFile();
  const fileSizeKB = fileExists ? (fs.statSync(localFilePath).size / 1024).toFixed(1) + ' KB' : 'MISSING';

  if (!fileExists) {
    console.error(`❌ File referenced in og:image does not exist in dist: ${localFilePath}`);
    failed++;
  } else {
    results.push({
      route: route.name,
      ogImageMeta: ogUrl,
      localFile: localFilePath,
      size: fileSizeKB
    });
  }
}

console.table(results);

if (failed > 0) {
  console.error(`\nFAIL: ${failed} og:image checks failed!`);
  process.exit(1);
} else {
  console.log(`\n🎉 PASS: All ${targetRoutes.length} target routes have valid og:image tags pointing to existing files!`);
}

