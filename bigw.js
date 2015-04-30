var request = require('request');
var cheerio = require('cheerio');
var url = "http://www.bigw.com.au/sitemap.xml";
var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};

request(options, function(err, req, res){
	var $ = cheerio.load(res);
	var newArr = [];
	$('loc').each(function(i, hrf){
		var newUrl = $(this).text().match(/-\d{4,6}\.htm|-\d{4,6}\.html/)
		var tempUrl = $(this).text()
		//console.log(tempUrl);
		console.log(newUrl)
		if(newUrl != null) newArr.push(tempUrl);
		console.log(newArr.length)
	});
});