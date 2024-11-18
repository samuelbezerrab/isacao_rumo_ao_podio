const puppeteer = require('puppeteer');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const randomNumber = Math.floor(Math.random() * (15000 - 10000 + 1)) + 10000;

(async () => {
    while (true) {
        // Colocar try catch por causa do timeout
        try {
            const browser = await puppeteer.launch({ headless: false }); // Set headless to `true` to run in the background
            const page = await browser.newPage();

            // Open the target URL
            await page.goto('https://suamusica.com.br/playlist/conectavozbahia2024/conecta-voz-show-feira-de-santana-1');

            // Wait for the span and click it
            const playButton = await page.waitForSelector('xpath/' + '//*[@id="AlbumTrackList"]/ul/div/div/li[4]/div[1]/p/span[1]', { visible: true });
            if (playButton) {
                playButton.click()
                await sleep(randomNumber)
                console.log('Success')
                await browser.close() // await page.reload()
            } else {
                console.log('PlayButton not found', playButton)
            }
        } catch {

        }

    }
})()