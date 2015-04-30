var request = require('request');
var cheerio = require('cheerio');

var url = "http://lightology.com/";

var count, totalCount = 0;

request(url, function(err, req, res){
	var $ = cheerio.load(res);
	var catUrl = [];
	$('.column2x ul li a').each(function(i, hrf){
		catUrl[i] = $(this).attr('href');
//		console.log(catUrl[i]);
		if(catUrl[i].match(/search/) == null ){
			
			request(catUrl[i], function(error, requ, resp){
				var $$ = cheerio.load(resp);
				var num = $$('.showing-items').text().match(/of.*/) != null ?$$('.showing-items').text().match(/of.*/)[0].replace('of','').trim():0;
				count = parseInt(num);
				totalCount = count + totalCount;
				console.log(catUrl[i] + "--->" + count);
				console.log("Total Count = " + totalCount);
			});
		}
	});
	
});
