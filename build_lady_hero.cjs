const sharp = require('sharp');
const fs = require('fs');

async function buildLadyHero() {
  const srcPath = 'C:/Users/Lenovo/.gemini/antigravity/brain/3ff8d69f-f439-4b6a-8121-8c467b969902/.user_uploaded/media_1794567103224_57ad5ddc.jpg';

  // Load original
  const src = sharp(srcPath);
  const { data, info } = await src.clone().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // We want to remove the bottom wave/teal area and keep only the lady + white background,
  // then composite it cleanly on the teal hero background.
  // The image IS the full scene (white bg + lady) - we'll use it as-is upscaled to serve as 
  // the right-side element within the hero background.
  // 
  // Approach: Upscale to 3x (3072 x 1728) using Lanczos3 + light sharpen
  // Then use as background-image: position right, cover the right portion of hero.
  
  await sharp(srcPath)
    .resize(2560, 1440, { kernel: sharp.kernel.lanczos3, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .sharpen({ sigma: 0.6, m1: 0.6, m2: 0.3 })
    .webp({ quality: 95, effort: 5 })
    .toFile('public/images/product-hero-lady-scene.webp');
    
  console.log('Done: public/images/product-hero-lady-scene.webp');

  // Also check dimensions
  const meta = await sharp('public/images/product-hero-lady-scene.webp').metadata();
  console.log('Output:', meta.width, 'x', meta.height);
}

buildLadyHero().catch(console.error);

