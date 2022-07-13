const puppeteer = require('puppeteer')
const scrapper = require('./pageScrapper')

async function scrapperEvent(url) {
    const browser = await puppeteer.launch({
        'args': [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    let event = await scrapper(browser, url)

    browser.close()

    console.log(`scrapperEvent ${url} : ${event.text}`)

    return event
}

exports.scrapperEvent = scrapperEvent