const express = require('express')
var moment = require('moment');
const scrapping = require('./workers/scrapping')
const dbController = require('./db/dbController')
var cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

process.env.TZ = "America/Argentina/Buenos_Aires"

var corsOptions = {
    origin: 'https://marianslg.github.io',
    optionsSuccessStatus: 200
}

app.get('/', cors(corsOptions), async(req, res) => {
    res.send("Hola!")
})

app.get('/getAllEvents', cors(corsOptions), async(req, res) => {
    try {
        const data = dbController.getEvents()

        res.status(200).send(data)
    } catch (ex) {
        res.status(400).send(ex)
    }
})

app.get('/getDateTime', cors(corsOptions), async(req, res) => {
    try {
        res.status(200).send(moment().format('DD/MM/YYYY hh:mm:ss a'))
    } catch (ex) {
        res.status(400).send(ex)
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

scrapping.start()

setInterval(scrapping.start, 1000 * 60 * 60)