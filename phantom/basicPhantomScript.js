/*
To use this in CLI or in node js// use url in command line
var system = require('system');
var argument = system.args[1];
*/

var url = "http://www.freedom.com.au/homewares/bedroom/pillows-doonas-mattress-protectors/";
var page = require('webpage').create();
page.open(url, function(status){
	console.log(page.content);
	phantom.exit()
})
