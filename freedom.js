var request = require('request'),
    cheerio = require('cheerio');

//var url = "http://www.freedom.com.au/homewares/bedroom/pillows-doonas-mattress-protectors/";
var url = "http://www.freedom.com.au/";
var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}}
request(url , function(er,re, res){
	console.log(url);
	var $ = cheerio.load(res);

	console.log(res);
	// $('a').each(function(){
	// 	console.log($(this).attr('href'))
	// })
	// console.log($('title').text())
})

