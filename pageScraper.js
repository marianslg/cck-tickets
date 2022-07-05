async function scraper(browser, url) {
    const page = await browser.newPage()

    await page.goto(url)
    await page.waitForSelector('#credito')

    return await page.$eval('div.gtr-uniform > div.col-6 > label', el => el.innerText)
}

module.exports = scraper;