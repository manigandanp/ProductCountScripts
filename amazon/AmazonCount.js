var request = require('request');
var cheerio = require('cheerio');

var options = {url:"http://www.amazon.com/gp/site-directory/ref=nav_sad", headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};

request(options, function(error, response, html){

	var $ = cheerio.load(html);
	var urlArr = [], count, totalCount =0;
	$('#shopAllLinks ul li a').each(function(i, href){
		urlArr[i] = "http://www.amazon.com" + $(this).attr('href');
//		console.log(urlArr[i])
		var option = {url:urlArr[i], headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};
		request(option, function(err, res, body){
			body = body != undefined ? body : "mani";

			var $$ = cheerio.load(body);
			$$('.categoryRefinementsSection ul li a').each(function(j, value){
				count = $$(this).last('span').text().match(/\(\d.+\)/) != null?$$(this).last('span').text().match(/\(\d.+\)/)[0].replace('(','').replace(')','').trim():0;
				totalCount = totalCount + parseInt(count);
				console.log($$(this).attr('href') + ' --- > ' + count);
				console.log(urlArr[i] + ' <<--->> ' + totalCount);
			});
		});

	});
});
