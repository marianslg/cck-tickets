const puppeteer = require('puppeteer');
const scraper = require('./pageScraper');

async function getEvents(url) {
    const browser = await puppeteer.launch({
        'args': [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    let text = await scraper(browser, url);

    browser.close();

    return {
        url,
        text
    }
}

module.exports = getEvents;