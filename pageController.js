/*const pageScraper = require('./pageScraper');

async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        await pageScraper.scraper(browser);

    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)*/

const puppeteer = require('puppeteer');
const scraper = require('./pageScraper');

async function getEvents(from, to) {
    var result = []

    //browser = await puppeteer.launch({})
    /*browser = await puppeteer.launch({
        headless: false,
        args: ["--disable-setuid-sandbox"],
        'ignoreHTTPSErrors': true
    })*/
    const browser = await puppeteer.launch({
        'args': [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    let host = 'https://itecno.com.ar/cckirchner/index.asp?event='

    for (i = from; i < to; i++) {
        let url = host.concat(i)
        let text = await scraper(browser, url);

        result.push({
            url,
            text
        });
    }

    browser.close();

    return result;
}

module.exports = getEvents;