/*
var request = require('request');
var cheerio = require('cheerio');

var url = "http://www.superamart.com.au/sitemap.xml", urlArr = [];
var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};

request(options, function(error, req, html){
	var $ = cheerio.load(html);
	$('loc').each(function(i,href){
		var newUrl = $(this).text().match(/-\d.+$/)
		var tempUrl = $(this).text()
		if(newUrl != null) urlArr.push(newUrl);
		console.log(tempUrl + " <--> " + urlArr.length);
	});
});
*/
var request = require('request');
var cheerio = require('cheerio');

var url = "https://www.kogan.com/au/sitemap-products.xml" ;//"http://www.superamart.com.au/sitemap.xml", urlArr = [];
var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};

request(options, function(error, req, html){
	var $ = cheerio.load(html);
	console.log(html);
});