var request = require('request');
var cheerio = require('cheerio');		
var uri = "http://www.amazon.com/Exercise-Fitness-Sports-Outdoors/b/ref=sd_allcat_ef/186-6783085-6099805?ie=UTF8&node=3407731"
		var option = {url:uri, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}};
		request(option, function(err, res, body){
			var $$ = cheerio.load(body);
			console.log($$('.categoryRefinementsSection ul') + "")
			$$('.categoryRefinementsSection ul li a').each(function(j, value){
				count = $$(this).last('span').text().match(/\(\d.+\)/) != null?$$(this).last('span').text().match(/\(\d.+\)/)[0].replace('(','').replace(')','').trim():0;
				totalCount = totalCount + parseInt(count);
				console.log($$(this).attr('href') + ' --- > ' + count);
				console.log(urlArr[i] + ' <<--->> ' + totalCount);
			});
		});
