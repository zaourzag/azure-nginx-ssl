const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        args: [
          '--window-size=1920,1080',
        ],
      });
  const page = await browser.newPage();
  await page.goto(`https://pokedex-two-smoky.vercel.app/details/26`);
  await page.waitForTimeout(5000);
  await page.setViewport({
    width: 1200,
    height: 1200,
  });
  await page.screenshot({ path: 'pokedex.png',  fullPage: true});
 
  await browser.close();
})();