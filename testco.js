var request = require('request');
var cheerio = require('cheerio');
var url = "http://www.tesco.com/direct";
var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};

var urlArr = [], allUrlArr = [];

request(options, function(err, req, html){
	var $ = cheerio.load(html);
	$('.has-no-category a > b').parent('a').each(function(i, u){
		var tempUrl = "http://www.tesco.com" + $(this).attr('href');
		urlArr.push(tempUrl);
	})
	urlArr.shift();
	for(var j=0; j<urlArr.length;j++){
		(function(j){
			options.uri = urlArr[j];
			request(options, function(ero, res, htm){
				var $$ = cheerio.load(htm);
				console.log(htm + "")
				$$('#main-menu ul li a').each(function(ui, uu){
					var tmpUrl = "http://www.tesco.com" + $$(this).attr('href');
					allUrlArr.push(tmpUrl);
					console.log(tmpUrl);
				});
			})
		})(j)
	}
	
})