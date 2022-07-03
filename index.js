const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const getEvents = require('./pageController');

app.get('/', async(req, res) => {
    res.send(await getEvents(295, 310));
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})