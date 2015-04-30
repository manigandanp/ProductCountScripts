var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//var url = "http://www.snapdeal.com/products/mobiles";
//var url = "http://www.snapdeal.com/products/computers";
//var url = "http://www.snapdeal.com/campaign/281";
//var url =  "http://www.snapdeal.com/products/home-kitchen-home-decoratives";
//var url4CatArr = ["http://www.snapdeal.com/products/mobiles","http://www.snapdeal.com/products/computers", "http://www.snapdeal.com/campaign/281",
//"http://www.snapdeal.com/products/home-kitchen-home-decoratives"]

var clotharr = ["http://www.snapdeal.com/products/women-apparel","http://www.snapdeal.com/products/women-ethnicwear","http://www.snapdeal.com/products/men-apparel","http://www.snapdeal.com/products/baby-clothing",
			"http://www.snapdeal.com/products/girls-clothing", "http://www.snapdeal.com/products/tweens-girls-clothing", "http://www.snapdeal.com/products/boys-clothing",
			"http://www.snapdeal.com/products/tweens-boys-clothing"];

//var url = arr[7];

// var fileName = "SnapDeal_" + url.match(/products.(.*)/)[1] + "_.csv";
// //var fileName = "SnapDeal_clothing.csv";

// var options = {uri : url, headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}}
// var header = "Catergory,Count,CategoryUrl,Brand,BrandCount\n";
// //fs.writeFileSync(fileName, header);

// request(options, function(err, req, res){

// 	var $ = cheerio.load(res);
// 	var urlArr = [], urlText = [], urlCount = [];

// 	$('li ~ ul li.subcatid a').each(function(i, hre){
// 		urlArr[i] = $(this).attr('href');
// 		urlText[i] = $(this).find('.catName').text();
// 		urlCount[i] = $(this).find('.catCount').text().replace(/\)/,'').replace('(','').trim();
// 		//console.log(urlArr[i] + " <--> " + urlText[i] + " <--> " + urlCount[i]);	
// 		var option = {uri : urlArr[i], headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}}
// 		request(option, function(error, requ, resp){

// 			var $$ = cheerio.load(resp);
// 			var brand = [], brandCount = [];
// 			$$('div[name="Brand"] input[filterdisplayname="Brand"] ~ label').each(function(j, brnd){
// 				brand[j] = $(this).find('a').text();
// 				brandCount[j] = $(this).find('small').text().replace(/\)/,'').replace('(','').trim();
// 				console.log(urlArr[i] + " <--> " + urlText[i] + " <--> " + urlCount[i] + " <--> " + brand[j] + " <--> " + brandCount[j]);
// 				data = '"' + urlText[i] + '","' + urlCount[i] + '","' + urlArr[i] + '","' + brand[j] + '","' + brandCount[j] + '"\n';
// 				fs.appendFileSync(fileName, data);

// 			});

// 		});

// 	});

// });

function proddata(newurlarr, callback){
	for(var u=0; u<newurlarr.length; u++){
		(function(u){
			var url = newurlarr[u];
			//var fileName = "SnapDeal_" + (url.match(/products.(.*)/) != null ? url.match(/products.(.*)/)[1] : "LargeAppliances") + "_.csv";
			
			var fileName = "SnapDeal_clothing.csv";

			var options = {uri : url, headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}}
			var header = "Catergory,Count,CategoryUrl,Brand,BrandCount\n";
			//fs.writeFileSync(fileName, header);

			request(options, function(err, req, res){

				var $ = cheerio.load(res);
				var urlArr = [], urlText = [], urlCount = [];

				$('li ~ ul li.subcatid a').each(function(i, hre){
					urlArr[i] = $(this).attr('href');
					urlText[i] = $(this).find('.catName').text();
					urlCount[i] = $(this).find('.catCount').text().replace(/\)/,'').replace('(','').trim();
					//console.log(urlArr[i] + " <--> " + urlText[i] + " <--> " + urlCount[i]);	
					var option = {uri : urlArr[i], headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}}
					request(option, function(error, requ, resp){

						var $$ = cheerio.load(resp);
						var brand = [], brandCount = [];
						$$('div[name="Brand"] input[filterdisplayname="Brand"] ~ label').each(function(j, brnd){
							brand[j] = $(this).find('a').text();
							brandCount[j] = $(this).find('small').text().replace(/\)/,'').replace('(','').trim();
							console.log(urlArr[i] + " <--> " + urlText[i] + " <--> " + urlCount[i] + " <--> " + brand[j] + " <--> " + brandCount[j]);
							data = '"' + urlText[i] + '","' + urlCount[i] + '","' + urlArr[i] + '","' + brand[j] + '","' + brandCount[j] + '"\n';
							fs.appendFileSync(fileName, data);

						});

					});

				});

			});


		if(u == (newurlarr.length - 1)) callback();
		})(u);
	}
}

console.log("started");

proddata(clotharr, function(){console.log("Finished");});