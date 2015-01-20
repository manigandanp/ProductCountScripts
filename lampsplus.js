var request = require('request');
var cheerio = require('cheerio');

var url = "http://www.lampsplus.com/sitemap-index.xml";

var count = 0, totalCount = 0;

request(url, function(err, req, res){
	var $ = cheerio.load(res);
	var catUrl = [];
	$('loc').each(function(i, hrf){
		catUrl[i] = $(this).text();
//		console.log(catUrl[i]);
		request(catUrl[i], function(error, requ, resp){
			var $$ = cheerio.load(resp);
			$$('loc').each(function(j, txt){count++});
			totalCount = count + totalCount;
			console.log(catUrl[i] + "--->" + count);
			console.log("Total Count = " + totalCount);
		});
	});
	
});
