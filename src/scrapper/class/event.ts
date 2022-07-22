import { ScrapingDataResult } from "./scrapingDataResult";

export class Event {
    constructor(url: string, text: string, data: ScrapingDataResult) {
        this.url = url
        this.text = text
        this.data = data
    }

    url: string
    text?: string
    data?: ScrapingDataResult
}