const getEvents = require('./pageController');
const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.get('/', async(req, res) => {
    res.send("Hola!");
})

app.get('/getEvents', async(req, res) => {
    res.send(await getEvents(295, 310));
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})