// var request=require('request');
// var cheerio=require('cheerio');
// var url="http://budcobank.com/asccustompages/products.asp?isSearch=y";
// var obj={
// 	uri:url,
// 	headers:{'User-Agent':'Mozilla/5.0 (Windows NT 5.1; rv:30.0) Gecko/20100101 Firefox/30.0'}};

// request(obj,function(err,res,html){
// 	var $=cheerio.load(html);
// 	var pageUrl = {};
// 	pageUrl[res.request.href] = 0;
// 	$('.paging:nth-of-type(1) a').each(function(i, hre){pageUrl["http://budcobank.com"+$(this).attr('href')] = 0});
// 	var pageUrlArr = Object.keys(pageUrl), totalCount = 0;
// 	for(var k =0; k< pageUrlArr.length; k++){
// 		obj.uri = pageUrlArr[k];
// 		(function(j){
// 			request(obj, function(error, resp, body){
// 				var $$ = cheerio.load(body);
// 				var count = $$('tr td font[size="2"] a strong').length
// 				totalCount+= count
// 				console.log("Url : " + resp.request.href);
// 				console.log("TotalCount : " + totalCount);
// 			})
// 		})(k);
// 	}
// });


function remDup(arr){var obj = {};for(var i = 0; i <arr.length; i++){obj[arr[i]] = 0;}return Object.keys(obj)}

var newArr = [1,"Mani", "mani", "Mani", "mani", "sabari", "fathi", "Sabari", "Fathi", "fathi", "sabari", 6,8,7,1,3,5,6,4,6,8,];
console.log(newArr);
console.log(remDup(newArr));