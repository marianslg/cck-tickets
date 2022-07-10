var fs = require('fs')

const EVENTS_FILE = __dirname + `\\data\\events.json`

function getEvents() {
    if (fs.existsSync(EVENTS_FILE))
        return JSON.parse(fs.readFileSync(EVENTS_FILE));
    else
        throw `FileNotFound.`
}

function getLastestId() {
    const events = getEvents()

    if (events.length == 0)
        return 290;
    else {
        const eventsId = events.map(function(v) {
            return v.id
        });

        return Math.min(...eventsId)
    }
}

function saveEvents(events) {
    fs.writeFile(EVENTS_FILE, JSON.stringify(events), 'utf8', (err) => {
        if (err)
            throw err
    });
}

exports.getEvents = getEvents;
exports.getLastestId = getLastestId;
exports.saveEvents = saveEvents;