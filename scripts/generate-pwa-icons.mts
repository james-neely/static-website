import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../public");

const sizes = [192, 512] as const;

function buildSvg(size: number): string {
  const fontSize = Math.round(size * 0.38);
  const borderRadius = Math.round(size * 0.12);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1c1c1e"/>
          <stop offset="100%" stop-color="#2c2c2e"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${borderRadius}" fill="url(#bg)"/>
      <text
        x="50%" y="54%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="monospace"
        font-weight="700"
        font-size="${fontSize}"
        fill="#e6b422"
      >&lt;/&gt;</text>
    </svg>`;
}

async function generateIcons() {
  for (const size of sizes) {
    const svg = buildSvg(size);
    const outputPath = path.join(publicDir, `icon-${size}x${size}.png`);

    await sharp(Buffer.from(svg)).png().toFile(outputPath);

    console.log(`Generated ${outputPath}`);
  }
}

generateIcons();
