async function scrapper(browser, url) {
    const page = await browser.newPage()

    await page.goto(url)
    await page.waitForSelector('#credito')

    console.log(url)

    let text, data

    const EVENT_TYPE1 = 'div.gtr-uniform > div.col-6 > label'
    const EVENT_TYPE2 = 'div.gtr-uniform > div.col-6'

    if ((await page.$(EVENT_TYPE1)) !== null) {
        text = await page.evaluate(el => el.innerText, await page.$(EVENT_TYPE1))
        data = extractDataEventType1(text)
    } else if ((await page.$(EVENT_TYPE2)) !== null) {
        text = await page.evaluate(el => el.innerText, await page.$(EVENT_TYPE2))
        data = extractDataEventType2(text)
    } else {
        text = `Apellido y Nombre`
    }

    return {
        "url": url,
        "text": text,
        "data": data
    }
}

function extractDataEventType2(event) {
    const extract = event.split('\n')

    if (extract.length == 4) {
        return {
            "soldOut": null,
            "name": extract[0].trim(),
            "date": extract[1].trim(),
            "reserva": extract[3].trim()
        }
    }
}

function extractDataEventType1(event) {
    const extract = event.split('-')

    switch (extract.length) {
        case 3:
            {
                if (extract[0].trim().toUpperCase() == 'AGOTADO') {
                    return {
                        "soldOut": true,
                        "name": extract[1].trim(),
                        "date": extract[2].trim(),
                    }
                } else {
                    return {
                        "soldOut": false,
                        "name": extract[0].trim(),
                        "date": extract[1].trim(),
                        "time": extract[2].trim(),
                    }
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
                return null
            }
    }
}

module.exports = scrapper