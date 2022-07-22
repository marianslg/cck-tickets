import { Scraping } from '../scrapper/scraping'
import { saveEventOnDB } from '../controllers/dbController'
import { IEvent } from '../controllers/IEvent'
import { getAllEventsFromDataBase } from '../controllers/dbController'

export class Worker {
    private readonly URL_BASE: string = `https://itecno.com.ar/cckirchner/index.asp?event=`

    async ScrapingEvents() {
        console.log('ScrapingEvents init')

        let events = []

        //lastId: number = dbController.getLastestId()

        let lastId: number = 0

        if (lastId == 0) lastId = 290 // Si no hay nada en la BD empiezo a analizar las URL desde el ID 290

        let counter = 0
        let target = 1

        const RANGE = 5 //Luego de encontrar el ultimo evento, pruebo en buscar los 5 ID siguientes.
        const LIMIT = 300 // Limite de busqueda. Si al superarlo no encuentro ningun evento, termino la instrucción.

        const scraping = new Scraping()

        try {
            await scraping.initBrowser()

            do {
                let url: string = this.URL_BASE + lastId;

                let event = await scraping.scrapingEvent(url);

                if (event.text != `Apellido y Nombre`) {
                    const newEvent: IEvent = {
                        id: lastId,
                        url: url,
                        event: event.text,
                        name: event.eventName,
                        soldOut: event.eventSoldOut,
                        eventDate: event.eventDate,
                        eventTime: event.eventTime,
                        reserve: event.eventReserve
                    }
                    console.log(newEvent)
                    await saveEventOnDB(newEvent)

                    target = counter + RANGE
                } else if (counter == 0) {
                    target = LIMIT
                }

                lastId++
                counter++
            } while (counter < target)
        } catch (ex) {
            console.error(ex)
        } finally {
            scraping.closeBrowser()
        }
    }

    async scrapingEvent(id: number) {
        const scraping = new Scraping()

        try {
            await scraping.initBrowser()
            let event = await scraping.scrapingEvent(this.URL_BASE + id);
            const newEvent: IEvent = {
                id: id,
                url: this.URL_BASE + id,
                event: event.text,
                name: event.eventName,
                soldOut: event.eventSoldOut,
                eventDate: event.eventDate,
                eventTime: event.eventTime,
                reserve: event.eventReserve
            }

            getAllEventsFromDataBase()
            await saveEventOnDB(newEvent)
        } catch (ex) {
            console.error(ex)
        } finally {
            scraping.closeBrowser()
        }
    }
}