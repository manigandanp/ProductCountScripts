var request = require("request"),
	cheerio = require("cheerio");

//var url = "http://banksupplies.com/sitemap.xml";
var url = "http://www.blockandcompany.com/sitemap.xml";

request(url, function(err, req, res){
	var $ = cheerio.load(res);
	var newArr = [];
	$('loc').each(function(i,e){
		var proUrl = $(this).text();
		if(proUrl.indexOf('.html') != -1){
			var temp = getFrequency(proUrl);
			if(temp['/'] == 3) {
				newArr.push(proUrl)
				//console.log(newArr.length);
			}
			
		}
	});
	console.log(newArr);
	console.log(newArr.length);
})

function getFrequency(string) {
    var freq = {};
    for (var i=0; i<string.length;i++) {
        var character = string.charAt(i);
        if (freq[character]) {
           freq[character]++;
        } else {
           freq[character] = 1;
        }
    }

    return freq;
}