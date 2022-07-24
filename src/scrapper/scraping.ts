import { Browser, Page } from "puppeteer"
import puppeteer from 'puppeteer'
import { ScrapingDataResult } from './class/scrapingDataResult'

export class Scraping {
    browser: Browser
    page: Page

    async initBrowser() {
        this.browser = await puppeteer.launch({
            'args': [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });

        this.page = await this.browser.newPage()
    }

    closeBrowser() {
        this.browser.close()
    }

    async scrapingEvent(url: string): Promise<ScrapingDataResult> {
        await this.page.goto(url)
        await this.page.waitForSelector('#credito')

        let text: string | null | undefined
        let data = new ScrapingDataResult()

        const EVENT_TYPE1 = 'div.gtr-uniform > div.col-6 > label'
        const EVENT_TYPE2 = 'div.gtr-uniform > div.col-6'

        if ((await this.page.$(EVENT_TYPE1)) !== null) {
            text = await this.page.evaluate(el => el?.textContent, await this.page.$(EVENT_TYPE1))
            data = extractDataEventType1(text!)
        } else if ((await this.page.$(EVENT_TYPE2)) !== null) {
            text = await this.page.evaluate(el => el?.textContent, await this.page.$(EVENT_TYPE2))
            data = extractDataEventType2(text!)
        } else {
            data.text = text = `Apellido y Nombre`
        }

        console.log(`scrapingEvent ${url}`)

        return data
    }
}

function extractDataEventType2(eventText: string): ScrapingDataResult {
    const extract = eventText.split('\n')
    const result = new ScrapingDataResult()
    result.text = eventText

    if (extract.length == 4) {
        result.eventName = extract[0].trim()
        result.eventReserve = extract[3].trim()
        return result
    }
    else if (extract.length == 8) {
        result.eventSoldOut = 0
        result.eventName = extract[2].trim().split('   ')[0].trim()
        result.eventDate = getDate(extract[2].trim().split('   ')[1].split('-')[0].trim())
        result.eventTime = extract[2].trim().split('   ')[1].split('-')[1].trim()
        result.eventReserve = extract[5].trim()
        return result
    } else
        return result
}

function extractDataEventType1(eventText: string): ScrapingDataResult {
    const extract = eventText.split('-')
    const result = new ScrapingDataResult()
    result.text = eventText

    switch (extract.length) {
        case 3:
            {
                if (extract[0].trim().toUpperCase() == 'AGOTADO') {
                    result.eventSoldOut = 1
                    result.eventName = extract[1].trim()
                    result.eventDate = getDate(extract[2].trim())

                    return result
                } else {
                    result.eventSoldOut = 0
                    result.eventName = extract[0].trim()
                    result.eventDate = getDate(extract[1].trim())
                    result.eventTime = extract[2].trim()

                    return result
                }
            }
        case 4:
            {
                result.eventSoldOut = 1
                result.eventName = extract[0].trim()
                result.eventDate = getDate(extract[1].trim())
                result.eventTime = extract[2].trim()

                return result
            }
        default:
            {
                return result
            }

    }
}

var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function getDate(date: string): string {
    var pattern = /([A-Za-zÁÉÍÓÚáéíóúñÑ]+), (\d+) de (\w+) de (\d+)/;

    if (pattern.test(date)) {
        const day = parseInt(date.replace(pattern, '$2'))
        const month = meses.indexOf(date.replace(pattern, '$3'))
        const year = parseInt(date.replace(pattern, '$4'))

        return new Date(year, month, day).toISOString()
    }
    else {
        return date
    }
}