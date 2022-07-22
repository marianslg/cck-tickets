export class ScrapingDataResult {
    constructor(eventName?: string, eventDate?: string, eventSoldOut?: number, eventReserve?: string) {
        this.eventName = eventName
        this.eventDate = eventDate
        this.eventSoldOut = eventSoldOut
        this.eventReserve = eventReserve
    }

    text: string | null | undefined
    eventName?: string
    eventDate?: string
    eventTime?: string
    eventSoldOut?: number
    eventReserve?: string
}
