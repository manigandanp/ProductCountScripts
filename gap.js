var request = require('request');
var cheerio = require('cheerio');
var webdriver = require('selenium-webdriver');

var url = "http://www.gap.com/products/index.jsp"
var urlarr = [], count, totalcount = 0;

request(url, function(err, res, htm){
	var $ = cheerio.load(htm);
	$('.idxHeader a').each(function(i,hre){
		var temp = $(this).attr('href').match(/http/) == null?$(this).attr('href'):"" ;
		urlarr[i] = "http://www.gap.com" + temp;
//		console.log(urlarr[i]);
		var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
		driver.get(urlarr[i]);
		var source = driver.getPageSource();
		var $$ = cheerio.load(source);
		count = $$('#totalItemCountDiv').text();
		console.log(urlarr[i]+" <--->" + count);
		driver.quit()

	});
});



