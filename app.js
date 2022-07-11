const express = require('express')

const scrapping = require('./workers/scrapping')
const dbController = require('./db/dbController')
var path = require('path');

const app = express()
const port = process.env.PORT || 5000

process.env.TZ = "America/Argentina/Buenos_Aires"

app.get('/', async(req, res) => {
    res.send("Hola!")
})

app.get('/getAllEvents', async(req, res) => {
    try {
        const data = dbController.getEvents()

        res.status(200).send(data)
    } catch (ex) {
        res.status(400).send(ex)
    }
})

app.get('/getDateTime', async(req, res) => {
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