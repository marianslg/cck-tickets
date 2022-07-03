/*const scraperObject = {
    coso: "https://itecno.com.ar/cckirchner/index.asp?event=295",
    url: 'http://books.toscrape.com',

    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        // Wait for the required DOM to be rendered
        await page.waitForSelector('.page_inner');

        // Get the link to all the required books
        let urls = await page.$$eval('section ol > li', links => {
            // Make sure the book to be scraped is in stock
            links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
                // Extract the links from the data
            links = links.map(el => el.querySelector('h3 > a').href)

            return links;
        });

        console.log(urls);

    }
}

module.exports = scraperObject;*/

async function scraper(browser, url) {
    const page = await browser.newPage()

    let text = ""

    try {
        await page.goto(url)
        await page.waitForSelector('#credito')
        text = await page.$eval('div.gtr-uniform > div.col-6 > label', el => el.innerText)
    } catch (ex) {}

    return text;
}

module.exports = scraper;