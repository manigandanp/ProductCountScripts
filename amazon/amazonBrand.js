var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var fileName = "amazonBrand.csv";

//var url = "http://www.amazon.in/gp/search/other/ref=sr_in_-2_1?rh=i%3Aaps%2Ck%3A-brand%2Cp_89%3ALondon+Lady&keywords=-brand&pickerToList=lbr_brands_browse-bin&ie=UTF8&qid=1421385366";
//var url = "http://www.amazon.in/gp/search/other/ref=sr_sa_p_89?rh=i%3Aaps%2Ck%3Abrand%2Cp_89%3ABrand&keywords=brand&pickerToList=lbr_brands_browse-bin&ie=UTF8&qid=1421392422";

//var url = "http://www.amazon.in/gp/search/other/ref=sr_sa_p_89?rh=i%3Aaps%2Ck%3A-all%2Cp_89%3ADMG&keywords=-all&pickerToList=lbr_brands_browse-bin&ie=UTF8&qid=1421393005";
var url = "http://www.amazon.in/gp/search/other/ref=sr_sa_p_89?rh=i%3Aaps%2Ck%3Aall%2Cp_89%3ADMG&keywords=all&pickerToList=lbr_brands_browse-bin&ie=UTF8&qid=1421393067";

var options = {uri : url, headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}};

request(options, function(err, req, res){
	var $ = cheerio.load(res);
	var alphaUrl = [], brand = [], brandUrl = [];
	$('#breadCrumbDiv ~ .srSprite:nth-child(3) .pagnLink a').each(function(i, hrf){
		alphaUrl[i] = "http://www.amazon.in" +$(this).attr('href');
		//console.log(alphaUrl[i]);
		var option = {uri : alphaUrl[i], headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}};
		request(option, function(error, requ, resp){
			var $$ = cheerio.load(resp);
			$$('ul.column li a').each(function(j, brd){
				brand[j] = $$(this).find('.refinementLink').text();
				brandUrl[j] = "http://www.amazon.in" + $$(this).attr('href');
				console.log(brand[j] + " <---> " + brandUrl[j]);
				var data = '"' + j + '","'+ brand[j] + '","' + brandUrl[j] + '"\n';
				fs.appendFileSync(fileName, data);
			});
		});
	});
});