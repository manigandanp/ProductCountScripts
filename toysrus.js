var request = require('request')
var cheerio = require('cheerio')

var url = "http://www.toysrus.com/category/index.jsp?categoryId=2273442&ab=TRU_Header:Utility3:See-All-Categories:Successful-Search-Results";

request(url, function(err, res, body){

	var urlarr = [], count, totalCount = 0;
	var $ = cheerio.load(body);
//	console.log($('#categoryIndexTRU') + "");
	$('#categoryIndexTRU ul li a').each(function(i, href) { 
		urlarr[i] = "http://www.toysrus.com" + $(this).attr('href'); 
//		console.log(urlarr[i])
		if(urlarr[i].match(/category.in/i) == null){
			request(urlarr[i], function(error, resp, htm){
				var $$ = cheerio.load(htm);
				count = $$('.showingText').first().text().match(/of.+/) != null?$$('.showingText').first().text().match(/of.+/)[0].match(/\d.+/)[0].replace(/result[s]/i,"").trim() : 0;
				console.log(urlarr[i] + " ---> " + count);
				totalCount = totalCount + parseInt(count);
				console.log(totalCount);
			})
		}else{
			request(urlarr[i], function(erro, respo, html){
				var newUrl = [];
				var $$$ = cheerio.load(html);
				$$$('h2 a.featured-category-link').each(function(j,hrf){
					newUrl[j] = "http://www.toysrus.com" + $$$(this).attr('href');
					request(newUrl[j] , function(ror, response, content){
					var $r = cheerio.load(content);
					count = $r('.showingText').first().text().match(/of.+/) != null?$r('.showingText').first().text().match(/of.+/)[0].match(/\d.+/)[0].replace(/result[s]/i,"").trim() : 0;
					console.log(urlarr[i] + " ---> " + count);
					totalCount = totalCount + parseInt(count);
					console.log(totalCount);
			})
					
				});
			});
		}	
	});

});
