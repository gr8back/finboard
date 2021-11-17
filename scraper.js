const fs = require('fs')
const puppeteer = require('puppeteer');



(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();


	page.emulate({
		name: 'Desktop 1920x1080',
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
		viewport: {
			width: 1200,
			height: 3000
		},
	})

		var mylinks = [
			["https://www.cnbc.com/", "//*[@id=\"market-data-scroll-container\"]/a[2]/div[2]/div/span[2]","s&p"],
			["https://ycharts.com/indicators/cboe_spx_put_call_ratio",'/html/body/main/div/div[2]/div/div/div[2]',"put-call ratio"],
			["https://ycharts.com/indicators/sp_500_earnings_yield",'/html/body/main/div/div[2]/div/div/div[2]',"earnings yield"],
			["https://www.cnbc.com/quotes/?symbol=10Y2YS", "//*[@id=\"MainContentContainer\"]/div/div[2]/div[1]/div[2]/div[3]/div/div[2]/span[1]", "2s minus 10s"]
		]

				var mypair2 = {}

		for (let i = 0; i < mylinks.length; i ++) {
			try {
				await page.goto(mylinks[i][0], {"waitUntil": "networkidle0"});
				await page.screenshot({path: 'yahootest.png', fullPage: true});
				await page.waitForXPath(mylinks[i][1]);
				let elHandle = await page.$x(mylinks[i][1]);
				console.log("handle " + elHandle)
				let mylambda = await page.evaluate(el => el.textContent, elHandle[0]);
				console.log('Data:', mylambda);
				var mykey = mylinks[i][2]
				var mypair = {mykey: mylambda}
				mypair2[mykey] = mylambda
				console.log("mypair " + JSON.stringify(mypair2))
			} catch(err) {
				console.log("error caught" + err)
			}
		}
			fs.writeFile("./test.json", JSON.stringify(mypair2), ()=>{
    			console.log("file writtten " + JSON.stringify(mypair2))
			})
			await browser.close();
})()





async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 300;
            console.log("innerheight " + document.body.scrollHeight)
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 500);
        })
    })
}


