var request = require('request');
var cheerio = require('cheerio');

var url = "http://www.snapdeal.com/search?keyword=*&santizedKeyword=&catId=&categoryId=&suggested=false&vertical=&noOfResults=20&clickSrc=go_header&lastKeyword=&prodCatId=&changeBackToAll=false&foundInAll=false&categoryIdSearched=&cityPageUrl=&url=&utmContent=&catalogID=&dealDetail=";
var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};

request(options, function(er, req, res){
	var $ = cheerio.load(res);
	var totalCount = 0;
	$('#matchingCatbox>ul>li.subcatid.parentCategoryCls .catName + .catCount, #matchingCatbox>div>ul>li.subcatid.parentCategoryCls .catName + .catCount').each(function(i, er){
		var cunt = $(this).text().replace('(', "").replace(")", "").trim()
		cunt = parseInt(cunt);
		totalCount +=cunt;
		console.log( i + "< --- > "+totalCount);
	});
});
