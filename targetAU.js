var request = require('request');
var cheerio = require('cheerio');

var url = "http://www.target.com.au/sitemap-index.xml" , proArr = [];

var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};

request(options, function(err, res, body){
	var $ = cheerio.load(body);
	$('loc').each(function(i, loca){
		if($(this).text().indexOf('/psm/') != -1) {
			var newUrl = $(this).text();
			options.uri = newUrl;
			request(options, function(error, req, html){
				var $$ = cheerio.load(html);
				$$('url loc').each(function(j, newLoc){
					if($$(this).text().indexOf('/p/') != -1){
						proArr.push($$(this).text());
						console.log('"'+ $$(this).text() +'","' +proArr.length + '"');
					}
				})
			});
		}
	});
});