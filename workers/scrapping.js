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
            const dataEvent = extractDataEvent(event)

            events.push({
                id: lastId,
                url,
                event,
                soldOut: dataEvent.soldOut,
                name: dataEvent.name,
                date: dataEvent.date,
                time: dataEvent.time
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

function extractDataEvent(event) {
    const extract = event.split('-')

    switch (extract.length) {
        case 3:
            {
                return {
                    "soldOut": false,
                    "name": extract[0].trim(),
                    "date": extract[1].trim(),
                    "time": extract[2].trim(),
                }
            }
        case 4:
            {
                return {
                    "soldOut": true,
                    "name": extract[1].trim(),
                    "date": extract[2].trim(),
                    "time": extract[3].trim(),
                }
            }
        default:
            {
                return {
                    "soldOut": null,
                    "name": null,
                    "date": null,
                    "time": null,
                }
            }
    }
}

function start() {
    try {
        scrappingAndSaveEvents()
    } catch (ex) {
        console.error(ex)
    }
}

exports.start = start;