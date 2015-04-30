var request = require('request');
var cheerio = require('cheerio');

var url = "http://www.tamilvu.org/slet/l2100/l2100lft.jsp",
	cookie = "auth_id=29:31:30:32:33:34:35:; head_id=26; JSESSIONID=E873ECA4D9C614645794BF7CB692BAC0; treemenu1=0,1,2,3; treemenu2=none open; treemenu3=0"//"auth_id=29:31:30:32:33:34:35:; head_id=26; JSESSIONID=E873ECA4D9C614645794BF7CB692BAC0; treemenu1=none open; treemenu2=none open; treemenu3=none open",
	userAgent = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36";

var options = {uri:url, headers : {"User-Agent":userAgent, "Cookie":cookie}};

request(options, function(err, req, res){
	var $ = cheerio.load(res);
	console.log(res);
	$('#treemenu1 > li.submenu').each(function(i,athi){
		var athikaram = $(this).text();
		console.log(athikaram);
	});
});
