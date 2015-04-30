var request = require("request");
var cheerio = require("cheerio");

var url = "http://www.google.com";


// request(url, function(er, res, body){
// 	var $ = cheerio.load(body);
// 	var title = $('title').text()
// 	if(title) document.getElementsByClassName('.test').innerHTML = title
// 	else document.getElementsByClassName('.test').innerHTML = "This is me.."
// 	//console.log(title);
// })
document.addEventListener("DOMContentLoaded", function(event) { 
	document.getElementsByClassName('test').appendChild(url)
})
console.log(url);