var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');

var url = "http://www.snapdeal.com/brands/";
var fileName = "snapdealBrand.csv";

var options = {uri : url, headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}};

request(options, function(err, req, res){
	var $ = cheerio.load(res);
	var brandAlphaArr = [], brandArr = [], brandUrlArr = [];
	$('.allbrands-links .brandLinks a').each(function(i, hrf){
		brandAlphaArr[i] = $(this).attr('href');
		//console.log(brandAlphaArr[i]);
		var option = {uri : brandAlphaArr[i], headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}};
		request(option, function(error, reque, resp){
			var $$ = cheerio.load(resp);
			$$('.brand-box-outer a').each(function(j, brd){
				brandArr[j] = $$(this).text();
				brandUrlArr[j] = $$(this).attr('href');
				console.log(j+1 + " <--> " + brandArr[j] + " <--> " + brandUrlArr[j]);
				var data = '"' + j + '","' + brandArr[j] + '","' + brandUrlArr[j] + '"\n';
				fs.appendFileSync(fileName, data);
			});
		})
	});
});

