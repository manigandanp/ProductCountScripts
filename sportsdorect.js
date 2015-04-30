var request = require('request');
var cheerio = require('cheerio');
var url = "http://www.sportsdirect.com/sitemap.xml";
var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};

request(options, function(err, res, htm){
	var $ = cheerio.load(htm), urlArr = [], newUrlArr = [];
	$('loc').each(function(i,hrf){
		var newUrl = $(this).text().match(/-product-/)
		if(newUrl != null) urlArr.push($(this).text());
	})
	for(var j =0; j<urlArr.length; j++){
		(function(j){
			options.uri = urlArr[j];
			request(options, function(ero, resp, html){
				var $$ = cheerio.load(html);
				$$('loc + lastmod').each(function(k,hr){
					var temp = $$(this).text().match(/2015-03/)
					if(temp != null){
						newUrlArr.push(temp);
						console.log(temp);
						console.log(newUrlArr.length);
					}
				});
			});
		})(j);
	}	
})