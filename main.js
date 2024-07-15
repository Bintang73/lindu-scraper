const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function infoLindu() {
    const scrape = await fetch('https://warning.bmkg.go.id/')
    const gethtml = await scrape.text()
    const $ = cheerio.load(gethtml)
    const time = $('#warning > div > div > div.col-8 > div > h5').text()
    const magnitudo = $('#warning > div > div > div.col-8 > div > ul > li:nth-child(1)').text().replace('Magnitudo', '')
    const kedalaman = $('#warning > div > div > div.col-8 > div > ul > li:nth-child(2)').text().replace('Kedalaman', '')
    const lintang = $('#warning > div > div > div.col-8 > div > ul > li:nth-child(3)').text()
    const ls = lintang.split('LS')[0]
    const bt = lintang.split('LS')[1].replace('BT', '')
    const lokasi = $('#warning > div > div > div.col-8 > div > div.infoext > p:nth-child(1)').text().replace('Lokasi Gempa', '')
    const wilayah = $('#warning > div > div > div.col-8 > div > div.infoext > p:nth-child(2)').text().replace('Wilayah Dirasakan (Skala MMI)', '')
    const arahan = $('#warning > div > div > div.col-8 > div > div.infoext > p:nth-child(3)').text().replace('Arahan', '')
    const saran = $('#warning > div > div > div.col-8 > div > div.infoext > p:nth-child(4)').text().replace('Saran BMKG', '')
    const peta = $('#warning > div > div > div.col-8 > div > div.infoext > p:nth-child(5) > a').attr('href')
    const alert = $('#warning > div > div > div.col-8 > div > div.infoext > p.alert-lindu').text()
    const lastupdate = $('#warning > div > div > div.col-8 > div > div.infoext > small').text()
    if (scrape.status === 200) {
        var result = {
            status: true,
            time,
            magnitudo,
            kedalaman,
            ls,
            bt,
            lokasi,
            wilayah,
            arahan,
            saran,
            peta,
            alert,
            lastupdate
        }
    } else {
        var result = {
            status: false
        }
    }
    return result
}

(async () => {
    const getLindu = await infoLindu()
    console.log(getLindu)
})()