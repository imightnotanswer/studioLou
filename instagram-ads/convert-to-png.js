const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function convertSvgToPng(svgPath, outputPath) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Set viewport to match SVG dimensions
        await page.setViewport({
            width: 1080,
            height: 1080,
            deviceScaleFactor: 1
        });

        // Read SVG file
        const svgContent = fs.readFileSync(svgPath, 'utf8');

        // Create HTML with the SVG embedded and fonts preloaded
        const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Figtree:wght@300;400;600&display=swap" rel="stylesheet">
          <style>
            body {
              margin: 0;
              padding: 0;
              width: 1080px;
              height: 1080px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          </style>
        </head>
        <body>
          ${svgContent}
        </body>
      </html>
    `;

        // Set content and wait for fonts to load
        await page.setContent(html, { waitUntil: 'networkidle0' });

        // Wait for fonts to be fully loaded
        await page.evaluate(() => {
            return document.fonts.ready;
        });

        // Wait a bit more for fonts to fully render
        await page.waitForTimeout(1000);

        // Take screenshot
        await page.screenshot({
            path: outputPath,
            width: 1080,
            height: 1080,
            clip: {
                x: 0,
                y: 0,
                width: 1080,
                height: 1080
            }
        });

        console.log(`✓ Converted ${path.basename(svgPath)} → ${path.basename(outputPath)}`);
    } catch (error) {
        console.error(`✗ Error converting ${svgPath}:`, error);
    } finally {
        await browser.close();
    }
}

async function main() {
    const svgFiles = [
        'the-edit.svg',
        'heaven-earth.svg',
        'the-remedy.svg',
        'the-essentials.svg',
        'facial-services-cover.svg'
    ];

    console.log('Converting SVG files to PNG...\n');

    for (const svgFile of svgFiles) {
        const svgPath = path.join(__dirname, svgFile);
        const pngPath = path.join(__dirname, svgFile.replace('.svg', '.png'));

        if (fs.existsSync(svgPath)) {
            await convertSvgToPng(svgPath, pngPath);
        } else {
            console.log(`✗ File not found: ${svgFile}`);
        }
    }

    console.log('\n✓ Conversion complete!');
}

main().catch(console.error);

