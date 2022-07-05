const getEvents = require('./pageController');
const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.get('/', async(req, res) => {
    res.send("Hola!");
})

app.get('/getEvents', async(req, res) => {
    let url = 'https://itecno.com.ar/cckirchner/index.asp?event='.concat(req.query.id)

    try {
        res.status(200).send(await getEvents(url));
    } catch (ex) {
        res.status(400).send({
            url,
            ex
        })
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})