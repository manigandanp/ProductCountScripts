var request = require('request');
var cheerio = require('cheerio');
var url = "http://www.asos.com/sitemap.ashx";
var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};

request(options, function(err, res, html){
	var $ = cheerio.load(html), proUrlArr = [];
	$('loc').each(function(i, r){
		var tmpUrl = $(this).text();
		if(tmpUrl.indexOf("InventoryGroupFilter=") != -1){
			options.uri = tmpUrl;
			request(options, function(ero, req, body){
				var $$ = cheerio.load(body);
				$$('loc').each(function(ir,ii){
					var proUrl = $$(this).text();
					if(proUrl.indexOf("/Prod/") != -1){
						proUrlArr.push(proUrl);
						console.log(proUrlArr.length);
					}
				})
			})
		}
	})
})