var request = require('request');
var cheerio = require('cheerio');

var url = "http://uae.souq.com/ae-en/shop-all-categories/c/"; //url = "http://egypt.souq.com/eg-en/shop-all-categories/c/";
var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36'} };


var urlArr=[], totalCount = 0;
	console.log("Running..");
request(options, function(error, reque, html){
	var $ = cheerio.load(html);
	$('div.phone-float-none ul li>a').each(function(i,hrf){
		var newUrl = $(this).attr('href');
		options.uri = newUrl;
		request(options, function(err, req, res){
			var $$ = cheerio.load(res);
			var count = $$('.text-orange em').text().trim() != '' ? $$('.text-orange em').text() : 0;
			count = parseInt(count);
			totalCount+=count;
//			console.log(req.request);
			console.log(req.request.href +" <---> " + count + " <---> " + totalCount );
		});
	});
});
