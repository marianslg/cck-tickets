var fs = require('fs');
const getEvents = require('./pageController');

async function getAllEvents() {
    var obj = {
        table: []
    };

    for (var i = 0; i < 500; i++) {
        let url = 'https://itecno.com.ar/cckirchner/index.asp?event='.concat(i)

        try {
            obj.table.push(await getEvents(url));
        } catch (ex) {
            obj.table.push({
                url,
                ex
            });
        }

        fs.writeFile('db.json', JSON.stringify(obj), 'utf8', (callback));
    }
}

function callback() {}

module.exports = getAllEvents;