var request = require('request');
var cheerio = require('cheerio');
var url = "http://www.jewson.co.uk/site-map/";
var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};
var urlArr = [], allUrlArr = [], totalCount = 0;

request(options, function(err, req, htm){
	var $ = cheerio.load(htm);
	$('.site-map ul li a').each(function(i,r){urlArr.push("http://www.jewson.co.uk" + $(this).attr('href'))});
	var newUrlArr = rmDp(urlArr);
	for(a in newUrlArr){
		options.uri = newUrlArr[a];
		(function(a){
			request(options, function(ero, reqs, html){
				var $$ = cheerio.load(html);
				var cunt = $$('.sort-options').contents().filter(function(){ return this.nodeType == 3});
				cunt = cunt.toString().match(/of(.*)pro/m) != null ? cunt.toString().match(/of(.*)pro/m)[1] : 0;
				//console.log(cunt.toString().match(/\d/m));
				 if(!isNaN(parseInt(cunt))){
					totalCount += parseInt(cunt)
					console.log(newUrlArr[a]  + " <-> " + totalCount + " <-> " + cunt);
				}
			});
		})(a);
	}
});

function rmDp(arr){var obj = {}; for(a in arr){ obj[arr[a]] = 0} return Object.keys(obj)}