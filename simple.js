var request = require("browser-request"),
	cheerio = require("cheerio"),
	jQuery = require("./jquery.js");
var url = "https://developer.chrome.com/extensions/manifest";

request(url, function(er,re,bo){
	var c$ = cheerio.load(bo)
	document.getElementById("resp").innerHTML = c$('title').text();
	var title = jQuery('h1', bo).text();
	jQuery('#jQry').text(title + " from jQuery");
})
