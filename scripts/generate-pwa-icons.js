#!/usr/bin/env node
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Path to your high-res source icon (e.g. 1024×1024 PNG)
const inputPath = path.resolve('src/assets/icon-source.png');

// Output directory (must match where your manifest icons live, e.g. `static/`)
const outputDir = path.resolve('static');

// Icon sizes to generate
const sizes = [192, 512];

async function generate() {
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	for (const size of sizes) {
		const filename = `pwa-${size}x${size}.png`;
		const outPath = path.join(outputDir, filename);

		await sharp(inputPath).resize(size, size).toFile(outPath);

		console.log(`✔ Generated ${filename}`);
	}
}

generate().catch((err) => {
	console.error('✖ Error generating icons:', err);
	process.exit(1);
});
