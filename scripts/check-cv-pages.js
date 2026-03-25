const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const filePath = 'file:///' + path.resolve(__dirname, '..', 'cv.html').split('\\').join('/');
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.fonts.ready);
    const tmp = path.join(__dirname, '..', '_cv_test.pdf');
    await page.pdf({ path: tmp, format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    await browser.close();
    const buf = fs.readFileSync(tmp, 'utf8');
    const pages = (buf.match(/\/Type\s*\/Page[^s]/g) || []).length;
    fs.unlinkSync(tmp);
    console.log('Pages :', pages);
})();
