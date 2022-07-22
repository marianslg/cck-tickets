var moment = require('moment');

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today = new Date();

console.log(new Date().toLocaleString('es-ES')); // 9/17/2016

const d = new Date("July 21, 1983 22:15:00");

console.log(moment(d).format('DD/MM/YYYY hh:mm:ss a'))

function reserve(eventId) {
    var myHeaders = new Headers();

    myHeaders.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
    myHeaders.append("Accept-Encoding", "gzip, deflate, br");
    myHeaders.append("Accept-Language", "es-ES,es;q=0.9,en;q=0.8");
    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Content-Length", "195");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Host", "itecno.com.ar");
    myHeaders.append("Origin", "https://itecno.com.ar");
    myHeaders.append("Pragma", "no-cache");
    myHeaders.append("Referer", `https://itecno.com.ar/cckirchner/index.asp?event=${eventId}`);
    myHeaders.append("sec-ch-ua", "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"");
    myHeaders.append("sec-ch-ua-mobile", "?1");
    myHeaders.append("sec-ch-ua-platform", "\"Android\"");
    myHeaders.append("Sec-Fetch-Dest", "document");
    myHeaders.append("Sec-Fetch-Mode", "navigate");
    myHeaders.append("Sec-Fetch-Site", "same-origin");
    myHeaders.append("Sec-Fetch-User", "?1");
    myHeaders.append("Upgrade-Insecure-Requests", "1");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Mobile Safari/537.36");

    var urlencoded = new URLSearchParams();
    urlencoded.append("fechap", `07/06/2022 11:00:00 p.m.-${eventId}`);
    urlencoded.append(`vtaMonto${eventId}`, "2");
    urlencoded.append("vtaname", "Mariano Andres Salguero");
    urlencoded.append("vtaDocumento", "35119810");
    urlencoded.append("vtaEmail", "salguero.ms@gmail.com");
    urlencoded.append("vtaEmail2", "salguero.ms@gmail.com");
    urlencoded.append("enviare", "Enviar");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://itecno.com.ar/cckirchner/SoporteEnviarAWS.asp", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}