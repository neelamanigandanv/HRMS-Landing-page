const sharp = require('sharp');

async function buildProductHeroLady() {
  const srcPath = 'C:/Users/Lenovo/.gemini/antigravity/brain/3ff8d69f-f439-4b6a-8121-8c467b969902/.user_uploaded/media_1794567103224_57ad5ddc.jpg';
  
  // The uploaded image (1024x576) is basically the home page hero - 
  // white/light background on left side, lady in teal blazer with laptop on right,
  // teal wave at the very bottom.
  //
  // The Product Overview hero section has a teal (#217775) background.
  // We need an image that shows just the lady (no white background visible) 
  // suitable for placement on the right side of the hero.
  //
  // Strategy: Crop the right portion of the image (lady+laptop), 
  // upscale to 2:1 aspect ratio to match hero height,
  // then composite onto a matching teal canvas.

  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const ch = info.channels;

  // The hero image (product-hero-exact-pristine-v10.webp) is 2048x962.
  // We'll create a 2048x962 canvas with:
  // - Left half: transparent (shows the CSS background teal)
  // - Right half: the lady extracted from the uploaded image

  // Crop: Take x: 540..1024 (484px wide), y: 0..576 (the full height) of the original
  // This gives us just the lady + background area
  // We'll crop the left ~540px of white to remove the text side
  
  // The lady's body starts around x=630 in original. Let's crop from x=600.
  const cropLeft = 600;
  const cropW = w - cropLeft; // 1024 - 600 = 424px
  const cropH = h; // 576
  
  // Extract lady region from raw data
  const ladyBuf = Buffer.alloc(cropW * cropH * 3);
  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const srcIdx = (y * w + (x + cropLeft)) * ch;
      const dstIdx = (y * cropW + x) * 3;
      ladyBuf[dstIdx] = data[srcIdx];
      ladyBuf[dstIdx + 1] = data[srcIdx + 1];
      ladyBuf[dstIdx + 2] = data[srcIdx + 2];
    }
  }
  
  // The output image will be 2048x962 (matches existing hero bg dimensions)
  // Right half = 1024px wide, left half = 1024px wide (teal fill)
  const outW = 2048, outH = 962;
  
  // 1. Upscale the cropped lady portion to fit the right 1024px @ 962px height
  const ladyScaled = await sharp(ladyBuf, { raw: { width: cropW, height: cropH, channels: 3 } })
    .resize(1024, outH, { kernel: sharp.kernel.lanczos3, fit: 'cover', position: 'center' })
    .sharpen({ sigma: 0.5, m1: 0.5, m2: 0.3 })
    .raw()
    .toBuffer();
  
  // 2. Create full teal canvas (teal matching .po-hero-section: #217775)
  // rgb(33, 119, 117)
  const canvasBuf = Buffer.alloc(outW * outH * 3);
  for (let i = 0; i < outW * outH; i++) {
    canvasBuf[i * 3] = 33;     // R
    canvasBuf[i * 3 + 1] = 119; // G
    canvasBuf[i * 3 + 2] = 117; // B
  }

  // 3. Composite: paste lady (1024x962) on the right half (x: 1024..2047)
  // But we also want to blend the left edge of the lady with the teal background
  // so there's no sharp cutoff. We'll blend a 120px feather zone.
  const featherW = 120;
  for (let y = 0; y < outH; y++) {
    for (let x = 1024; x < outW; x++) {
      const srcX = x - 1024;
      const srcIdx = (y * 1024 + srcX) * 3;
      const dstIdx = (y * outW + x) * 3;

      // Get pixel from lady portion
      const lr = ladyScaled[srcIdx];
      const lg = ladyScaled[srcIdx + 1];
      const lb = ladyScaled[srcIdx + 2];
      
      // The lady's white background -> blend with teal for the feather zone
      // Feather: 0 = full teal, 1 = full lady image
      let alpha = 1;
      if (srcX < featherW) {
        alpha = srcX / featherW;
        // Smooth: ease in
        alpha = alpha * alpha * (3 - 2 * alpha);
      }
      
      // Blend white -> teal for the pure white areas
      const isNearWhite = lr > 220 && lg > 220 && lb > 220;
      if (isNearWhite) {
        // Blend with teal
        const blendAlpha = alpha;
        canvasBuf[dstIdx] = Math.round(33 * (1 - blendAlpha) + lr * blendAlpha);
        canvasBuf[dstIdx + 1] = Math.round(119 * (1 - blendAlpha) + lg * blendAlpha);
        canvasBuf[dstIdx + 2] = Math.round(117 * (1 - blendAlpha) + lb * blendAlpha);
      } else {
        canvasBuf[dstIdx] = Math.round(33 * (1 - alpha) + lr * alpha);
        canvasBuf[dstIdx + 1] = Math.round(119 * (1 - alpha) + lg * alpha);
        canvasBuf[dstIdx + 2] = Math.round(117 * (1 - alpha) + lb * alpha);
      }
    }
  }

  // 4. Remove the bottom wave from the lady image (teal wave: y > 870 in outH space)
  // The wave sits at the very bottom. Keep teal background there.
  const waveStart = outH - 95;
  for (let y = waveStart; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      const dstIdx = (y * outW + x) * 3;
      canvasBuf[dstIdx] = 33;
      canvasBuf[dstIdx + 1] = 119;
      canvasBuf[dstIdx + 2] = 117;
    }
  }

  // Save as WebP
  await sharp(canvasBuf, { raw: { width: outW, height: outH, channels: 3 } })
    .webp({ quality: 95, effort: 5 })
    .toFile('public/images/product-hero-lady-scene-v2.webp');

  console.log('Saved: public/images/product-hero-lady-scene-v2.webp (' + outW + 'x' + outH + ')');
}

buildProductHeroLady().catch(console.error);

