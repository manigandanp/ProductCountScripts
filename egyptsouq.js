var request = require('request');
var cheerio = require('cheerio');
console.log('Hello');
var url = "http://souq.com/eg-en/";

request(url, function(error, response, body){
	console.log(body + "");
});

console.log('world');
