const express = require('express')

const scrapping = require('./workers/scrapping')
const dbController = require('./db/dbController')

const app = express()
const port = process.env.PORT || 5000

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

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

setInterval(scrapping.scrapingAndSaveEvents, 1000 * 60 * 60)