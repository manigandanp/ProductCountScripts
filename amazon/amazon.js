var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var fileName = "amazon_out.csv";
// All categories except cloting
/*
//var url = "http://www.amazon.in/mobiles-accessories/b/ref=sd_allcat_sa_menu_mobile_all_mobiles?ie=UTF8&node=1389401031";
//var url = "http://www.amazon.in/s/ref=lp_1389401031_nr_n_0?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031&bbn=1389401031&ie=UTF8&qid=1421386632&rnid=1389401031";
//var url = "http://www.amazon.in/computers-and-accessories/b/ref=sd_allcat_computers_all?ie=UTF8&node=976392031";
//var url = "http://www.amazon.in/Large-Appliances/b/ref=sd_allcat_lrgapp?ie=UTF8&node=1380263031";
//var url = "http://www.amazon.in/b/ref=sd_allcat_aud_vid_home_ent?ie=UTF8&node=1389375031";
//var url = "http://www.amazon.in/Small-Appliances/b/ref=sd_allcat_hk_small_appliances?ie=UTF8&node=3044926031";
//var url = "http://www.amazon.in/Home-D%C3%A9cor/b/ref=sd_allcat_home_decor?ie=UTF8&node=1380374031";
//var url = "http://www.amazon.in/b/ref=sd_allcat_hk_lighting?ie=UTF8&node=1380485031";
var url = "http://www.amazon.in/b/ref=sd_allcat_hk_lawngarden?ie=UTF8&node=4294807031";

var options = {uri : url, headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}};


request(options, function(err, req, res){
	var $ = cheerio.load(res);
	var catText = [], catUrl = [], catCount = [];
	$(".categoryRefinementsSection ul li a .refinementLink").each(function(i, hre){
		catText[i] = $(this).text();
		catUrl[i] = "http://www.amazon.in" + $(this).parent().attr('href');
		catCount[i] = $(this).next("span.narrowValue").text().replace('(',"").replace(')',"");
		console.log(catText[i] + " < - - > " + catUrl[i] + " <--> " + catCount[i] );
		var data = '"' + catText[i] + '","'+ catUrl[i] + '","' + catCount[i] + '"\n';
		fs.appendFileSync(fileName, data);
	});
});

*/

//var url = "http://www.amazon.in/Womens-clothing/b/ref=amb_link_181998107_17?ie=UTF8&node=1953602031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_s=merchandised-search-leftnav&pf_rd_r=080Z2WS9Z71H22JZM6GV&pf_rd_t=101&pf_rd_p=575293647&pf_rd_i=1571271031";
//var url = "http://www.amazon.in/womens-ethnic-wear/b/ref=amb_link_181998107_10?ie=UTF8&node=1968253031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_s=merchandised-search-leftnav&pf_rd_r=080Z2WS9Z71H22JZM6GV&pf_rd_t=101&pf_rd_p=575293647&pf_rd_i=1571271031";
//var url = "http://www.amazon.in/Western-Wear-for-Women/b/ref=amb_link_181998107_14?ie=UTF8&node=5362091031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_s=merchandised-search-leftnav&pf_rd_r=080Z2WS9Z71H22JZM6GV&pf_rd_t=101&pf_rd_p=575293647&pf_rd_i=1571271031";
//var url = "http://www.amazon.in/s/ref=lp_1968248031_ex_n_1?rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031&bbn=1968024031&ie=UTF8&qid=1421389824";
//var url = "http://www.amazon.in/s/ref=lp_1968024031_nr_n_1?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968126031&bbn=1968024031&ie=UTF8&qid=1421389831&rnid=1968024031";
//var url = "http://www.amazon.in/s/ref=lp_4091091031_nr_n_2?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571273031%2Cn%3A%211975997031%2Cn%3A4091091031%2Cn%3A1967936031&bbn=4091091031&ie=UTF8&qid=1421390013&rnid=4091091031";
//var url = "http://www.amazon.in/s/ref=lp_4091091031_nr_n_1?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571273031%2Cn%3A%211975997031%2Cn%3A4091091031%2Cn%3A1967851031&bbn=4091091031&ie=UTF8&qid=1421390013&rnid=4091091031";
var url = "http://www.amazon.in/s/ref=lp_4091091031_nr_n_0?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571273031%2Cn%3A%211975997031%2Cn%3A4091091031%2Cn%3A1953148031&bbn=4091091031&ie=UTF8&qid=1421390013&rnid=4091091031";

var options = {uri : url, headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}};

request(options, function(err, req, res){
	var $ = cheerio.load(res);
	var catText = [], catUrl = [], catCount = [];
	$('.categoryRefinementsSection ul li a .refinementLink').each(function(i, hre){
		catText[i] = $(this).text();
		catUrl[i] = "http://www.amazon.in" + $(this).parent().attr('href');
		var option = {uri : catUrl[i], headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}};
		request(option, function(error, requ, resp){
			var $$ = cheerio.load(resp);
			catCount[i] = $$("h2#s-result-count").text().match(/of(.*)result/) != null ? $$("h2#s-result-count").text().match(/of(.*)result/)[1] : "Not Found";
			console.log(catText[i] + " < - - > " + catUrl[i] + " <--> " + catCount[i] );
			var data = '"' + catText[i] + '","'+ catUrl[i] + '","' + catCount[i] + '"\n';
			fs.appendFileSync(fileName, data);
		});
	});
});