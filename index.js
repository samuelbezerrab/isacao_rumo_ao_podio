const puppeteer = require('puppeteer');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
function randomNumber() {
    return Math.floor(10000 + Math.random() * 5000);
}

(async () => {

    let rounds = 0
    const browser = await puppeteer.launch({ headless: false }); // Set headless to `true` to run in the background

    while (true) {
        // Colocar try catch por causa do timeout
        try {
            const page = await browser.newPage();

            // Open the target URL
            await page.goto('https://suamusica.com.br/playlist/conectavozbahia2024/conecta-voz-show-feira-de-santana-1');

            // Wait for the span and click it
            const playButton = await page.waitForSelector('xpath/' + '//*[@id="AlbumTrackList"]/ul/div/div/li[4]/div[1]/p/span[1]', { visible: true });
            if (playButton) {
                playButton.click()

                const time_to_wait =  randomNumber()
                await sleep(time_to_wait)
                
                await page.close()
                rounds++
                console.log('Success', {
                    time_to_wait : time_to_wait,
                    rounds: rounds
                })
            } else {
                console.log('PlayButton not found', playButton)
            }
        } catch {

        }
    }
})()