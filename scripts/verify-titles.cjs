const fs = require('fs');
const path = require('path');

// Dynamically read blogData.ts and guidesData.ts to ensure 100% exact match
const blogFile = fs.readFileSync('src/data/blogData.ts', 'utf8');
const guideFile = fs.readFileSync('src/data/guidesData.ts', 'utf8');

function extractBlogArticles() {
  const blogs = [];
  const slugs = [...blogFile.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
  const uniqueSlugs = [...new Set(slugs)];

  for (const s of uniqueSlugs) {
    const chunkStart = blogFile.indexOf(`slug: "${s}"`);
    const chunk = blogFile.slice(chunkStart, chunkStart + 1500);
    const titleMatch = chunk.match(/title:\s*"([^"]+)"/);
    const seoTitleMatch = chunk.match(/seoTitle:\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : '';
    const seoTitle = seoTitleMatch ? seoTitleMatch[1] : undefined;

    const blogBrand = " | Zentilos Blog";
    const finalTitle = seoTitle
      ? (seoTitle.includes("Zentilos") ? seoTitle : `${seoTitle}${blogBrand}`)
      : (function () {
          const maxBaseLen = 60 - blogBrand.length;
          if (title.length <= maxBaseLen) return `${title}${blogBrand}`;
          const sliced = title.slice(0, maxBaseLen);
          const lastSpace = sliced.lastIndexOf(" ");
          const clean = (lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced).replace(/[\s,:;\-\/]+$/, "");
          return `${clean}${blogBrand}`;
        })();

    blogs.push({ slug: s, finalTitle, length: finalTitle.length });
  }
  return blogs;
}

function extractGuides() {
  const guides = [];
  const mapIdx = guideFile.indexOf('GUIDE_DETAILS_MAP');
  const mapChunk = guideFile.slice(mapIdx);
  const guideMatches = [...mapChunk.matchAll(/"([^"]+guide)":\s*\{[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",(?:[\s\S]*?seoTitle:\s*"([^"]+)",)?/g)];

  for (const m of guideMatches) {
    const slug = m[2];
    const title = m[3];
    const seoTitle = m[4];

    const guideBrand = " | Zentilos Guides";
    const finalTitle = seoTitle
      ? (seoTitle.includes("Zentilos") ? seoTitle : `${seoTitle}${guideBrand}`)
      : (function () {
          const maxBaseLen = 60 - guideBrand.length;
          if (title.length <= maxBaseLen) return `${title}${guideBrand}`;
          const sliced = title.slice(0, maxBaseLen);
          const lastSpace = sliced.lastIndexOf(" ");
          const clean = (lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced).replace(/[\s,:;\-\/]+$/, "");
          return `${clean}${guideBrand}`;
        })();

    guides.push({ slug, finalTitle, length: finalTitle.length });
  }
  return guides;
}

const blogs = extractBlogArticles();
const guides = extractGuides();

console.log('=== BLOG TITLES TABLE ===');
console.table(blogs);

console.log('\n=== GUIDES TITLES TABLE ===');
console.table(guides);

const over60 = [...blogs, ...guides].filter(x => x.length > 60);
console.log('\nAny title > 60 chars?', over60.length > 0 ? over60 : 'NONE (all <= 60 chars)');

