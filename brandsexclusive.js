var request = require('request');
var cheerio = require('cheerio');
var url = "https://women.brandsexclusive.com.au/";

var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};
var ulrObj = {}, proUrlObj = {}
request(options, function(err, res, body){
	var $ = cheerio.load(body);
	$('ul.smallBox li.small > a').each(function(i,hre){
		var newUrl = url + $(this).attr('href').replace('/','');
		ulrObj[newUrl] = 0;

	});
	var urlArr = Object.keys(ulrObj);
	for(var i = 0; i<urlArr.length; i++){
		(function(i){
			options.uri = urlArr[i];
			request(options, function(error, resp, html){
				var $$ = cheerio.load(html);
				$$('ul#pss_products_items > li > a').each(function(j,hre){
					var proUrl = $$(this).attr('href');
					console.log(proUrl);
					proUrlObj[proUrl] = 0;
				});
				//console.log(url + " <---> " +Object.keys(proUrlObj).length);
			});
		})(i);
	}
});