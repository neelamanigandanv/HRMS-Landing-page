const fs = require('fs');
const path = require('path');

const blogs = [
  'biometrics-vs-geofenced-mobile-tracking',
  'statutory-payroll-compliance-guide-2025',
  'evaluating-hrms-for-multi-branch-businesses',
  'streamlined-onboarding-cuts-new-hire-turnover',
  'continuous-feedback-vs-annual-reviews',
  'why-spreadsheet-payroll-fails-scaling-startups',
  'rotational-roster-management-guide',
  'hidden-costs-of-legacy-hr-software',
  'building-trust-with-employee-self-service',
];

console.log('=== BLOG POST AUDIT ===');
const blogTable = blogs.map(slug => {
  const filePath = path.join('dist/blog', slug, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  const hasVisibleFaq = html.includes('article-faq-section');
  const hasFaqPageSchema = html.includes('"@type": "FAQPage"') || html.includes('"@type":"FAQPage"');
  return {
    slug,
    hasVisibleFaq: hasVisibleFaq ? 'YES' : 'NO',
    hasFaqPageSchema: hasFaqPageSchema ? 'YES' : 'NO (omitted per guidelines)',
    consistent: (hasVisibleFaq === hasFaqPageSchema) ? 'PASS' : 'FAIL',
  };
});
console.table(blogTable);

const guides = [
  'payroll-management-guide',
  'leave-management-guide',
  'recruitment-management-guide',
  'statutory-compliance-guide',
  'expense-management-guide',
  'attendance-management-guide',
  'employee-onboarding-guide',
  'performance-appraisal-guide',
  'multibranch-hr-setup-guide',
];

console.log('\n=== GUIDES AUDIT ===');
const guideTable = guides.map(slug => {
  const filePath = path.join('dist/guides', slug, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  const hasVisibleFaq = html.includes('guide-faqs-container');
  const hasFaqPageSchema = html.includes('"@type": "FAQPage"') || html.includes('"@type":"FAQPage"');
  return {
    slug,
    hasVisibleFaq: hasVisibleFaq ? 'YES' : 'NO',
    hasFaqPageSchema: hasFaqPageSchema ? 'YES' : 'NO',
    consistent: (hasVisibleFaq === hasFaqPageSchema) ? 'PASS' : 'FAIL',
  };
});
console.table(guideTable);
