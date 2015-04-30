var request = require('request');
var cheerio = require('cheerio');
var url = "http://www.ebay.co.uk/sch/allcategories/all-categories/?_rdc=1";
var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};

console.log(__dirname);
console.log(__filename);
