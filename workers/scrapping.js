const scrapper = require('../scrapper/scrapper');
const dbController = require('../db/dbController');

const URL_BASE = `https://itecno.com.ar/cckirchner/index.asp?event=`

async function scrappingAndSaveEvents() {
    let events = []

    lastId = dbController.getLastestId()

    let counter = 0;
    let target = 1;

    do {
        let url = URL_BASE + lastId;

        let event = await scrapper.scrapperEvent(url);

        if (event != `Apellido y Nombre`) {
            events.push({
                id: lastId,
                url,
                event
            });

            dbController.saveEvents(events);

            target = lastId + 1
        } else if (counter == 0) {
            target = 300
        } else if (events.length > 0) {
            target = 0
        }

        lastId++;
        counter++;
    } while (counter < target)
}

async function start() {
    try {
        await scrappingAndSaveEvents()
    } catch (ex) {
        console.error(ex)
    }
}

exports.start = start;