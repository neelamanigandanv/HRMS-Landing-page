const sharp = require('sharp');

async function analyze() {
  const imgPath = 'C:/Users/Lenovo/.gemini/antigravity/brain/3ff8d69f-f439-4b6a-8121-8c467b969902/.user_uploaded/media_1794567103224_57ad5ddc.jpg';
  const img = sharp(imgPath);
  const meta = await img.metadata();
  console.log('Image dimensions:', meta.width, 'x', meta.height);

  // Let's sample colors on left (text side) vs right (lady side)
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const getP = (x, y) => {
    const idx = (y * info.width + x) * 3;
    return [data[idx], data[idx+1], data[idx+2]];
  };

  console.log('Left top (100, 100):', getP(100, 100));
  console.log('Left mid (200, 300):', getP(200, 300));
  console.log('Left btm wave (100, 530):', getP(100, 530));
  console.log('Center top (512, 100):', getP(512, 100));
  console.log('Center mid (512, 300):', getP(512, 300));
  console.log('Lady face (~760, 200):', getP(760, 200));
  console.log('Lady blazer (~750, 450):', getP(750, 450));
  console.log('Laptop (~880, 500):', getP(880, 500));
  console.log('Bottom right wave (900, 550):', getP(900, 550));
}
analyze();

