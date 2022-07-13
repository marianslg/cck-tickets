const scrapper = require('../scrapper/scrapper')
const dbController = require('../db/dbController')

const URL_BASE = `https://itecno.com.ar/cckirchner/index.asp?event=`

async function scrappingAndSaveEvents() {
    let events = []

    lastId = dbController.getLastestId()

    if (lastId == 0) lastId = 290 // Si no hay nada en la BD empiezo a analizar las URL desde el ID 290

    let counter = 0
    let target = 1
    const RANGE = 5 //Luego de encontrar el ultimo evento, pruebo en buscar los 5 ID siguientes.
    const LIMIT = 300 // Limite de busqueda. Si al superarlo no encuentro ningun evento, termino la instrucción.

    do {
        let url = URL_BASE + lastId;

        let event = await scrapper.scrapperEvent(url);

        if (event.text != `Apellido y Nombre`) {
            events.push({
                id: lastId,
                url: event.url,
                event: event.text,
                data: event.data
            });

            dbController.saveEvents(events)

            target = counter + RANGE
        } else if (counter == 0) {
            target = LIMIT
        }

        lastId++
        counter++
    } while (counter < target)
}

function start() {
    try {
        scrappingAndSaveEvents()
    } catch (ex) {
        console.error(ex)
    }
}

async function scrapEvent() {
    let url = URL_BASE + '330';

    console.log("-------------------------------------------------------------------")

    console.log(await scrapper.scrapperEvent(URL_BASE + '333'))
    console.log("-------------------------------------------------------------------")

    console.log(await scrapper.scrapperEvent(URL_BASE + '328'))
    console.log("-------------------------------------------------------------------")

    console.log(await scrapper.scrapperEvent(URL_BASE + '317')) // agotado
    console.log("-------------------------------------------------------------------")

    console.log(await scrapper.scrapperEvent(URL_BASE + '33'))

    let event = await scrapper.scrapperEvent(url);


    if (event != `Apellido y Nombre`) {

    }
}

exports.start = start