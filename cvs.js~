var request = require('request');
var cheerio = require('cheerio');

//var url = "http://www.cvs.com/shop/personal-care/incontinence/for-women/N-3uZ13g6jnZ2k?navNum=100"
//var url = "http://www.cvs.com/shop/personal-care/incontinence/for-men/N-3uZ13g6jlZ2k?navNum=100";
//var url = "http://www.cvs.com/shop/personal-care/incontinence/bladder-control-devices/N-3uZe7dtZ2k?navNum=100";
//var url = "http://www.cvs.com/shop/personal-care/incontinence/pads-pantiliners/N-3uZe7xmZ2k?navNum=100";
//var url = "http://www.cvs.com/shop/personal-care/incontinence/guards/N-3uZ1f89Z2k?navNum=100";
//var url = "http://www.cvs.com/shop/personal-care/incontinence/protective-underwear/N-3uZ1f8bZ2k?navNum=100";
//var url = "http://www.cvs.com/shop/personal-care/incontinence/bedding-protection/N-3uZe7xlZ2k?navNum=100";
//var url = "http://www.cvs.com/shop/personal-care/incontinence/bed-pans-urinals/N-3uZ13ryxiZ2k?navNum=100";
var url = "http://www.cvs.com/shop/personal-care/incontinence/skin-care/N-3uZ1f88Z2k?navNum=100";

request(url, function(err, req, res){
	var $ = cheerio.load(res);
	$('h4.productBrand > a').each(function(i,hrf){console.log("http://www.cvs.com" + $(this).attr('href'))})
})
