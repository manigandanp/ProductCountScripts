var request = require('request');
var cheerio = require('cheerio');
var jsdom = require("jsdom");


var url = "http://www.zara.com/us/";



request(url , function(err, req, res){
	var $ = cheerio.load(res);
	var catUrl = [], totalCount = 0;
	$('#mainNavigationMenu li a').each(function(i, hrf){
		catUrl[i] = $(this).attr('href');
		if(i > 0 && i < 4){
			//console.log(catUrl[i]);
			request(catUrl[i], function(error, reqt,resp){
				var $$ = cheerio.load(resp);
				var subCatUrl = [];
				$$('ul.current li a').each(function(j, hre){
					subCatUrl[j] = $$(this).attr('href');
					jsdom.env({
						  url: subCatUrl[j],
						  scripts: ["http://code.jquery.com/jquery.js"],

						  done: function (errors, window) {
						    var $$$ = window.$;
						   // if($$$.readyState === 'complete'){
						   	$$$('document').ready(function(){
								var count = $$$('.products-total > span').text().replace('products', '').trim();
								count = count == '' ? 0 : parseInt(count);
								totalCount+=count;
								console.log(subCatUrl[j] + " <---> " + count + " <---> " + totalCount);
							});
							//}
						    }
						  })
						})
				});
			}
		}
	)
});

/*

var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync("./jquery.js", "utf-8");
 
jsdom.env({
  url: "http://news.ycombinator.com/",
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (errors, window) {
    var $ = window.$;
    console.log("HN Links");
    $("td.title:not(:last) a").each(function () {
      console.log(" -", $(this).text());
    });
  }
});*/