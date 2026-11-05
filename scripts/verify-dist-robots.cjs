const fs = require('fs');

function checkRobots(filePath, expected) {
  const c = fs.readFileSync(filePath, 'utf8');
  const match = c.match(/<meta name="robots" content="([^"]+)"/i);
  const found = match ? match[1] : 'NONE';
  const ok = found === expected;
  console.log(`${filePath.padEnd(35)}: ${found} (Expected: ${expected}) -> ${ok ? '✔ PASS' : '❌ FAIL'}`);
  return ok;
}

console.log('=== Verifying Robots Tags in dist/ ===');
const checks = [
  checkRobots('dist/index.html', 'index, follow'),
  checkRobots('dist/faq/index.html', 'index, follow'),
  checkRobots('dist/about/index.html', 'index, follow'),
  checkRobots('dist/features/payroll-management/index.html', 'index, follow'),
  checkRobots('dist/blog/biometrics-vs-geofenced-mobile-tracking/index.html', 'index, follow'),
  checkRobots('dist/thank-you/index.html', 'noindex, follow'),
  checkRobots('dist/support/search/index.html', 'noindex, follow'),
  checkRobots('dist/support/track/index.html', 'noindex, follow'),
  checkRobots('dist/case-studies/index.html', 'noindex, follow'),
];

if (checks.every(Boolean)) {
  console.log('\n🎉 ALL ROBOTS TAGS VERIFIED 100% CORRECT!');
} else {
  console.error('\n❌ ROBOTS TAG VERIFICATION FAILED!');
  process.exit(1);
}

