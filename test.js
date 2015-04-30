var request = require('request');
var cheerio = require('cheerio');

var url = "http://www.dickssportinggoods.com/Products-hunting.xml.gz";

request(url, function(err, req, res){

	var $ = cheerio.load(res)
	console.log(res);
})