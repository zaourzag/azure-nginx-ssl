const puppeteer = require('puppeteer'); // import puppeteer

extractReviews = async (api) => {
    (async () => {
        const browser = await puppeteer.launch({
            args: [
              '--window-size=1920,1080',
            ],
          });
      const page = await browser.newPage();
      await page.goto(api);
      await page.waitForTimeout(5000);
      await page.setViewport({
        width: 1200,
        height: 1200,
      });
      const imageBuffer = await page.screenshot({
        type: 'jpeg',
        quality: 100,
        clip: {
          x: 0,
          y: 0,
          width: 640,
          height: 360,
        },
        omitBackground: true,
      });
     
      await browser.close();
        return imageBuffer;
    })();}
module.exports.extractReviews = extractReviews