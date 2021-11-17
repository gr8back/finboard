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

	// Site , xpath, click-xpath, label, need to click

		var mylinks = [
			["https://www.cnbc.com/", "//*[@id=\"market-data-scroll-container\"]/a[2]/div[2]/div/span[2]","s&p"],
			["https://ycharts.com/indicators/cboe_spx_put_call_ratio",'/html/body/main/div/div[2]/div/div/div[2]',"put-call ratio"],
			["https://ycharts.com/indicators/sp_500_earnings_yield",'/html/body/main/div/div[2]/div/div/div[2]',"earnings yield"],
			["https://www.cnbc.com/","//*[@id=\"Homepage-MarketsBanner-1\"]/div[1]/button[6]","copper",'//*[@id="market-data-scroll-container"]/a[3]/div[2]/div/span[2]']
		]

		var mypair2 = {}

		for (let i = 0; i < mylinks.length; i ++) {
			await page.goto(mylinks[i][0], {"waitUntil": "networkidle0"});
			await page.screenshot({path: 'yahootest.png', fullPage:true});

			if (i ==0) {
				console.log("clicking button")
				// await page.click('//*[@id="Homepage-MarketsBanner-1"]/div[1]/button[4]');

				if ( await page.waitForXPath(mylinks[i][1]) ) {
					console.log("button found")

					await page.click('#Homepage-MarketsBanner-1 > div.MarketsBannerMenu-container > button:nth-child(4)')

					await page.screenshot({path: 'buttontest.png', fullPage:true})
					await page.waitForXPath('//*[@id="market-data-scroll-container"]/a[1]/div[1]/span[2]', 5000);
					let elHandle = await page.$x('//*[@id="market-data-scroll-container"]/a[1]/div[1]/span[2]');
					console.log("handle " + elHandle)
					let lamudiNewPropertyCount1 = await page.evaluate(el => el.textContent, elHandle[0]);
    				console.log('Data:', lamudiNewPropertyCount1);
    				var mykey = "s&p"
					var mypair = {mykey: lamudiNewPropertyCount1}
					mypair2[mykey] = lamudiNewPropertyCount1
				} else {
					console.log("notfound")
				}

			} else {

				await page.waitForXPath(mylinks[i][1]);

				//if need to click
				if (mylinks[i][3]) {
					if (mylinks[i][3].length > 0) {
						await page.click("#Homepage-MarketsBanner-1 > div.MarketsBannerMenu-container > button:nth-child(6)")
						await page.waitForXPath(mylinks[i][3]);
						let elHandle1 = await page.$x(mylinks[i][3]);
						await page.screenshot({path: 'findcopper.png', fullPage:true})
						let lamudiNewPropertyCount1 = await page.evaluate(el => el.textContent, elHandle1[0]);
    					console.log('Copper:', lamudiNewPropertyCount1);
						var mykey1 = mylinks[i][2]
						mypair2["Copper1"] = lamudiNewPropertyCount1
					}
				}



				//
				let elHandle = await page.$x(mylinks[i][1]);
				console.log("handle " + elHandle)

				let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);
				console.log('Data:', lamudiNewPropertyCount);

				var mykey = mylinks[i][2]

				var mypair = {mykey: lamudiNewPropertyCount}
				mypair2[mykey] = lamudiNewPropertyCount
				console.log("mypair " + JSON.stringify(mypair2))

			}
		}
			fs.writeFile("./test2.json", JSON.stringify(mypair2), ()=>{
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
