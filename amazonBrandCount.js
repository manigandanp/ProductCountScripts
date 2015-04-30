var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var fileName = "amazonBrandwiseCount.csv";
//var url ="http://www.amazon.in/s/ref=lp_1389432031_nr_n_0?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389432031%2Cn%3A1805559031&bbn=1389432031&ie=UTF8&qid=1421386613&rnid=1389432031";
//var options = {uri : url, headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}};
function brandPage(options, catData){
	request(options, function(err, req, res){
		var $ = cheerio.load(res);
		var alphaUrl = [], brand = [], brandUrl = [], brandCount = [];
		$('#breadCrumbDiv ~ .srSprite:nth-child(3) .pagnLink a').each(function(i, hrf){
			alphaUrl[i] = "http://www.amazon.in" +$(this).attr('href');
			//console.log(alphaUrl[i]);
			var option = {uri : alphaUrl[i], headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}};
			request(option, function(error, requ, resp){
				var $$ = cheerio.load(resp);
				$$('ul.column li a').each(function(j, brd){
					brand[j] = $$(this).find('.refinementLink').text();
					brandCount[j] = $$(this).find('.narrowValue').text().replace('(','').replace(')','').trim();
					brandUrl[j] = "http://www.amazon.in" + $$(this).attr('href');
					console.log(catData + ' " ' + brand[j] + " <---> " + brandUrl[j] + " <---> "+ brandCount[j]);
					 var flwrtData = catData + '"' + brand[j] + '","'+brandCount[j] + '","'+brandUrl[j] + '"\n';
					fs.appendFileSync(fileName, flwrtData);
				});
			});
		});
	});
}



//Main Page Count
function mainPage(option, category){
	var catCount, catUrl, catText, brandCount, brandUrl, allBrandUrl;
	request(option, function(error, requ, resp){
			var $ = cheerio.load(resp);
			catCount = $("h2#s-result-count").text().match(/of(.*)result/) != null ? $("h2#s-result-count").text().match(/of(.*)result/)[1] : "Not Found";
			catText = $("h2#s-result-count span.a-text-bold").text();
			allBrandUrl = "http://www.amazon.in"+$("h2:contains('Brands') ~ ul li a span.seeMore").parent('a').attr('href');
			var data = '"'+ category+'","' +catText + '","' + option.uri + '","' + catCount + '",' ;
			var newOpt = option.uri = allBrandUrl;
			if($("h2:contains('Brands') ~ ul li a span.seeMore").parent('a').attr('href') != undefined){
				brandPage(newOpt, data);
			}else{
				var brand = [], brandUrl =[], brandCount = [];
				$("h2:contains('Brands') ~ ul#ref_3837712031 li a").each(function(k,hrf){
					brand[k] = $(this).find('.refinementLink').text();
					brandCount[k] = $(this).find('.narrowValue').text().replace('(','').replace(')','').trim();
					brandUrl[k] = "http://www.amazon.in" + $(this).attr('href');
					var catData = data;
					var flwrtData = catData + '"' + brand[k] + '","'+brandCount[k] + '","'+brandUrl[k] + '"\n';
					console.log(flwrtData);
					fs.appendFileSync(fileName, flwrtData);
				})
			}
	});
}

//mainPage(options, null)
/*
var urlCatArr = ["Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389432031_nr_n_0?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389432031%2Cn%3A1805559031&bbn=1389432031&ie=UTF8&qid=1421386613&rnid=1389432031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389432031_nr_n_1?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389432031%2Cn%3A1805560031&bbn=1389432031&ie=UTF8&qid=1421386613&rnid=1389432031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_0/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389403031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_1/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389404031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_2/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389405031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_3/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389406031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_4/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389409031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_5/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389410031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_6/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389417031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_7/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389418031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_8/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389421031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_9/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1388965031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_10/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389422031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_11/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389425031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_12/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389427031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_13/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389448031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Mobiles and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_14/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389428031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031"]

var urlCatArr = ["Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_0/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389403031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_1/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389404031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_2/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389405031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_3/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389406031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_4/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389409031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_5/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389410031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_6/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389417031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_7/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389418031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_8/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389421031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_9/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1388965031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_10/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389422031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_11/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389425031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_12/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389427031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_13/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389448031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_1389402031_nr_n_14/275-2435007-6588425?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389401031%2Cn%3A1389402031%2Cn%3A1389428031&bbn=1389402031&ie=UTF8&qid=1421387016&rnid=1389402031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_0/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375248031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_1/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375344031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_2/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375392031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_3/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375393031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_4/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375412031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_5/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375424031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_6/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375425031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_7/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375426031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_8/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375427031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_9/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375442031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_10/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375443031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_11/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375452031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_12/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375458031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031",
"Computer and Accessories||http://www.amazon.in/s/ref=lp_976392031_nr_n_13/276-8207893-4395724?fst=as%3Aoff&rh=n%3A976392031%2Cn%3A%21976393031%2Cn%3A1375459031&bbn=976393031&ie=UTF8&qid=1421387154&rnid=976393031"]
*/
/*
var urlCatArr = ["Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1380263031_nr_n_0/277-4851682-9326427?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380263031%2Cn%3A3474656031&bbn=1380263031&ie=UTF8&qid=1421387420&rnid=1380263031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1380263031_nr_n_1/277-4851682-9326427?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380263031%2Cn%3A1380269031&bbn=1380263031&ie=UTF8&qid=1421387420&rnid=1380263031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1380263031_nr_n_2/277-4851682-9326427?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380263031%2Cn%3A1380365031&bbn=1380263031&ie=UTF8&qid=1421387420&rnid=1380263031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1380263031_nr_n_3/277-4851682-9326427?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380263031%2Cn%3A1380369031&bbn=1380263031&ie=UTF8&qid=1421387420&rnid=1380263031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1389375031_nr_n_0/279-4471429-9775851?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389375031%2Cn%3A1389377031&bbn=1389375031&ie=UTF8&qid=1421387597&rnid=1389375031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1389375031_nr_n_1/279-4471429-9775851?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389375031%2Cn%3A1389379031&bbn=1389375031&ie=UTF8&qid=1421387597&rnid=1389375031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1389375031_nr_n_2/279-4471429-9775851?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389375031%2Cn%3A1389382031&bbn=1389375031&ie=UTF8&qid=1421387597&rnid=1389375031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1389375031_nr_n_3/279-4471429-9775851?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389375031%2Cn%3A1389386031&bbn=1389375031&ie=UTF8&qid=1421387597&rnid=1389375031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1389375031_nr_n_4/279-4471429-9775851?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389375031%2Cn%3A1389387031&bbn=1389375031&ie=UTF8&qid=1421387597&rnid=1389375031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1389375031_nr_n_5/279-4471429-9775851?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389375031%2Cn%3A1389457031&bbn=1389375031&ie=UTF8&qid=1421387597&rnid=1389375031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1389375031_nr_n_6/279-4471429-9775851?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389375031%2Cn%3A1389388031&bbn=1389375031&ie=UTF8&qid=1421387597&rnid=1389375031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1389375031_nr_n_7/279-4471429-9775851?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389375031%2Cn%3A1389391031&bbn=1389375031&ie=UTF8&qid=1421387597&rnid=1389375031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1389375031_nr_n_8/279-4471429-9775851?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389375031%2Cn%3A1389396031&bbn=1389375031&ie=UTF8&qid=1421387597&rnid=1389375031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1389375031_nr_n_9/279-4471429-9775851?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A%21976420031%2Cn%3A1389375031%2Cn%3A1389392031&bbn=1389375031&ie=UTF8&qid=1421387597&rnid=1389375031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_1380045031_nr_n_22?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A4951860031%2Cn%3A1380045031%2Cn%3A1380072031&bbn=1380045031&ie=UTF8&qid=1421387935&rnid=1380045031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_3044926031_nr_n_1/280-0972398-3666458?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976444031%2Cn%3A%211574657031%2Cn%3A3044926031%2Cn%3A1379960031&bbn=3044926031&ie=UTF8&qid=1421387892&rnid=3044926031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_3044926031_nr_n_2/280-0972398-3666458?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976444031%2Cn%3A%211574657031%2Cn%3A3044926031%2Cn%3A1380565031&bbn=3044926031&ie=UTF8&qid=1421387892&rnid=3044926031",
"Large Appliances ( Washing Machine, AC, Refrigerators, TVs, Microwaves,etc.)||http://www.amazon.in/s/ref=lp_3044926031_nr_n_3/280-0972398-3666458?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976444031%2Cn%3A%211574657031%2Cn%3A3044926031%2Cn%3A1380259031&bbn=3044926031&ie=UTF8&qid=1421387892&rnid=3044926031"
];
*/
/*
var urlCatArr = ["Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_0/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A5229870031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_1/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A1380375031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_2/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A1380378031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_3/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A1380380031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_4/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A1380385031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_5/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A1380392031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_6/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A3413802031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_7/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A2805326031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_8/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A1380542031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_9/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A1380408031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_10/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A3591704031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_11/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A1380415031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_12/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A1380419031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_13/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A5242296031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380374031_nr_n_14/275-6838663-7694016?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380374031%2Cn%3A1380418031&bbn=1380374031&ie=UTF8&qid=1421388043&rnid=1380374031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380485031_nr_n_0/277-1382861-2975068?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380485031%2Cn%3A1380486031&bbn=1380485031&ie=UTF8&qid=1421388254&rnid=1380485031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380485031_nr_n_1/277-1382861-2975068?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380485031%2Cn%3A1380487031&bbn=1380485031&ie=UTF8&qid=1421388254&rnid=1380485031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380485031_nr_n_2/277-1382861-2975068?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380485031%2Cn%3A2083429031&bbn=1380485031&ie=UTF8&qid=1421388254&rnid=1380485031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380485031_nr_n_3/277-1382861-2975068?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380485031%2Cn%3A1380488031&bbn=1380485031&ie=UTF8&qid=1421388254&rnid=1380485031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380485031_nr_n_4/277-1382861-2975068?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380485031%2Cn%3A1380498031&bbn=1380485031&ie=UTF8&qid=1421388254&rnid=1380485031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380485031_nr_n_5/277-1382861-2975068?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380485031%2Cn%3A1380499031&bbn=1380485031&ie=UTF8&qid=1421388254&rnid=1380485031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380485031_nr_n_6/277-1382861-2975068?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380485031%2Cn%3A4205447031&bbn=1380485031&ie=UTF8&qid=1421388254&rnid=1380485031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380485031_nr_n_7/277-1382861-2975068?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380485031%2Cn%3A1380500031&bbn=1380485031&ie=UTF8&qid=1421388254&rnid=1380485031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380485031_nr_n_8/277-1382861-2975068?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380485031%2Cn%3A1380507031&bbn=1380485031&ie=UTF8&qid=1421388254&rnid=1380485031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380485031_nr_n_9/277-1382861-2975068?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380485031%2Cn%3A1380508031&bbn=1380485031&ie=UTF8&qid=1421388254&rnid=1380485031",
"Home Decor||http://www.amazon.in/s/ref=lp_1380485031_nr_n_10/277-1382861-2975068?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A1380485031%2Cn%3A1380509031&bbn=1380485031&ie=UTF8&qid=1421388254&rnid=1380485031",
"Home Decor||http://www.amazon.in/s/ref=lp_4294807031_nr_n_0/279-7741434-5717445?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A4294807031%2Cn%3A3638811031&bbn=4294807031&ie=UTF8&qid=1421388276&rnid=4294807031",
"Home Decor||http://www.amazon.in/s/ref=lp_4294807031_nr_n_1/279-7741434-5717445?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A4294807031%2Cn%3A3638773031&bbn=4294807031&ie=UTF8&qid=1421388276&rnid=4294807031",
"Home Decor||http://www.amazon.in/s/ref=lp_4294807031_nr_n_2/279-7741434-5717445?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A4294807031%2Cn%3A3638818031&bbn=4294807031&ie=UTF8&qid=1421388276&rnid=4294807031",
"Home Decor||http://www.amazon.in/s/ref=lp_4294807031_nr_n_3/279-7741434-5717445?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A4294807031%2Cn%3A3638812031&bbn=4294807031&ie=UTF8&qid=1421388276&rnid=4294807031",
"Home Decor||http://www.amazon.in/s/ref=lp_4294807031_nr_n_4/279-7741434-5717445?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A4294807031%2Cn%3A3638776031&bbn=4294807031&ie=UTF8&qid=1421388276&rnid=4294807031",
"Home Decor||http://www.amazon.in/s/ref=lp_4294807031_nr_n_5/279-7741434-5717445?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A4294807031%2Cn%3A3638816031&bbn=4294807031&ie=UTF8&qid=1421388276&rnid=4294807031",
"Home Decor||http://www.amazon.in/s/ref=lp_4294807031_nr_n_6/279-7741434-5717445?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A4294807031%2Cn%3A3638815031&bbn=4294807031&ie=UTF8&qid=1421388276&rnid=4294807031",
"Home Decor||http://www.amazon.in/s/ref=lp_4294807031_nr_n_7/279-7741434-5717445?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A4294807031%2Cn%3A4297302031&bbn=4294807031&ie=UTF8&qid=1421388276&rnid=4294807031",
"Home Decor||http://www.amazon.in/s/ref=lp_4294807031_nr_n_8/279-7741434-5717445?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A4294807031%2Cn%3A4297301031&bbn=4294807031&ie=UTF8&qid=1421388276&rnid=4294807031",
"Home Decor||http://www.amazon.in/s/ref=lp_4294807031_nr_n_9/279-7741434-5717445?fst=as%3Aoff&rh=n%3A976442031%2Cn%3A%21976443031%2Cn%3A4294807031%2Cn%3A3638819031&bbn=4294807031&ie=UTF8&qid=1421388276&rnid=4294807031"
]
*/

var urlCatArr = ["Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_3/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968448031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_0/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968445031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_2/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968447031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_4/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968449031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_5/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968456031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_10/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968444031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_9/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968547031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_6/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968457031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_8/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968505031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_11/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968510031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_12/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968517031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_13/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968428031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_15/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968542031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953602031_nr_n_7/276-1544029-3706721?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968498031&bbn=1953602031&ie=UTF8&qid=1421389686&rnid=1953602031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968253031_nr_n_3/276-5957596-2358768?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968253031%2Cn%3A3723378031&bbn=1968253031&ie=UTF8&qid=1421389765&rnid=1968253031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968253031_nr_n_1/276-5957596-2358768?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968253031%2Cn%3A3723377031&bbn=1968253031&ie=UTF8&qid=1421389765&rnid=1968253031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968253031_nr_n_0/276-5957596-2358768?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968253031%2Cn%3A1968254031&bbn=1968253031&ie=UTF8&qid=1421389765&rnid=1968253031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968253031_nr_n_2/276-5957596-2358768?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968253031%2Cn%3A1968255031&bbn=1968253031&ie=UTF8&qid=1421389765&rnid=1968253031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968253031_nr_n_4/276-5957596-2358768?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968253031%2Cn%3A3723380031&bbn=1968253031&ie=UTF8&qid=1421389765&rnid=1968253031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968253031_nr_n_7/276-5957596-2358768?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968253031%2Cn%3A1968257031&bbn=1968253031&ie=UTF8&qid=1421389765&rnid=1968253031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968253031_nr_n_5/276-5957596-2358768?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968253031%2Cn%3A3731690031&bbn=1968253031&ie=UTF8&qid=1421389765&rnid=1968253031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968253031_nr_n_6/276-5957596-2358768?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953602031%2Cn%3A1968253031%2Cn%3A1968256031&bbn=1968253031&ie=UTF8&qid=1421389765&rnid=1968253031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_5362091031_nr_n_2/279-6063378-8739640?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211597453031%2Cn%3A%211597454031%2Cn%3A5362091031%2Cn%3A1968448031&bbn=5362091031&ie=UTF8&qid=1421389802&rnid=5362091031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_5362091031_nr_n_1/279-6063378-8739640?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211597453031%2Cn%3A%211597454031%2Cn%3A5362091031%2Cn%3A1968447031&bbn=5362091031&ie=UTF8&qid=1421389802&rnid=5362091031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_5362091031_nr_n_3/279-6063378-8739640?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211597453031%2Cn%3A%211597454031%2Cn%3A5362091031%2Cn%3A1968449031&bbn=5362091031&ie=UTF8&qid=1421389802&rnid=5362091031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_5362091031_nr_n_4/279-6063378-8739640?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211597453031%2Cn%3A%211597454031%2Cn%3A5362091031%2Cn%3A1968456031&bbn=5362091031&ie=UTF8&qid=1421389802&rnid=5362091031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_5362091031_nr_n_6/279-6063378-8739640?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211597453031%2Cn%3A%211597454031%2Cn%3A5362091031%2Cn%3A1968547031&bbn=5362091031&ie=UTF8&qid=1421389802&rnid=5362091031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_5362091031_nr_n_7/279-6063378-8739640?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211597453031%2Cn%3A%211597454031%2Cn%3A5362091031%2Cn%3A1968444031&bbn=5362091031&ie=UTF8&qid=1421389802&rnid=5362091031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_5362091031_nr_n_8/279-6063378-8739640?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211597453031%2Cn%3A%211597454031%2Cn%3A5362091031%2Cn%3A1968510031&bbn=5362091031&ie=UTF8&qid=1421389802&rnid=5362091031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_5362091031_nr_n_5/279-6063378-8739640?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211597453031%2Cn%3A%211597454031%2Cn%3A5362091031%2Cn%3A1968505031&bbn=5362091031&ie=UTF8&qid=1421389802&rnid=5362091031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_5362091031_nr_n_0/279-6063378-8739640?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211597453031%2Cn%3A%211597454031%2Cn%3A5362091031%2Cn%3A1968445031&bbn=5362091031&ie=UTF8&qid=1421389802&rnid=5362091031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_5362091031_nr_n_9/279-6063378-8739640?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211597453031%2Cn%3A%211597454031%2Cn%3A5362091031%2Cn%3A1968517031&bbn=5362091031&ie=UTF8&qid=1421389802&rnid=5362091031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_5362091031_nr_n_10/279-6063378-8739640?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211597453031%2Cn%3A%211597454031%2Cn%3A5362091031%2Cn%3A1968428031&bbn=5362091031&ie=UTF8&qid=1421389802&rnid=5362091031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_5362091031_nr_n_11/279-6063378-8739640?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211597453031%2Cn%3A%211597454031%2Cn%3A5362091031%2Cn%3A1968542031&bbn=5362091031&ie=UTF8&qid=1421389802&rnid=5362091031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968024031_nr_n_0/279-5943089-8532609?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968248031&bbn=1968024031&ie=UTF8&qid=1421389864&rnid=1968024031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968024031_nr_n_2/279-5943089-8532609?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968076031&bbn=1968024031&ie=UTF8&qid=1421389864&rnid=1968024031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968024031_nr_n_3/279-5943089-8532609?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968077031&bbn=1968024031&ie=UTF8&qid=1421389864&rnid=1968024031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968024031_nr_n_4/279-5943089-8532609?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968088031&bbn=1968024031&ie=UTF8&qid=1421389864&rnid=1968024031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968024031_nr_n_5/279-5943089-8532609?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968093031&bbn=1968024031&ie=UTF8&qid=1421389864&rnid=1968024031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968024031_nr_n_7/279-5943089-8532609?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968082031&bbn=1968024031&ie=UTF8&qid=1421389864&rnid=1968024031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968024031_nr_n_8/279-5943089-8532609?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968107031&bbn=1968024031&ie=UTF8&qid=1421389864&rnid=1968024031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968024031_nr_n_6/279-5943089-8532609?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968097031&bbn=1968024031&ie=UTF8&qid=1421389864&rnid=1968024031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968024031_nr_n_10/279-5943089-8532609?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968116031&bbn=1968024031&ie=UTF8&qid=1421389864&rnid=1968024031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968024031_nr_n_11/279-5943089-8532609?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968120031&bbn=1968024031&ie=UTF8&qid=1421389864&rnid=1968024031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968024031_nr_n_12/279-5943089-8532609?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968125031&bbn=1968024031&ie=UTF8&qid=1421389864&rnid=1968024031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968126031_nr_n_2/276-7413417-4884729?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968126031%2Cn%3A1968134031&bbn=1968126031&ie=UTF8&qid=1421389924&rnid=1968126031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968126031_nr_n_1/276-7413417-4884729?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968126031%2Cn%3A1968128031&bbn=1968126031&ie=UTF8&qid=1421389924&rnid=1968126031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968126031_nr_n_0/276-7413417-4884729?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968126031%2Cn%3A1968127031&bbn=1968126031&ie=UTF8&qid=1421389924&rnid=1968126031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1968126031_nr_n_3/276-7413417-4884729?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968126031%2Cn%3A1968135031&bbn=1968126031&ie=UTF8&qid=1421389924&rnid=1968126031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967936031_nr_n_0/280-1606849-2685230?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967936031%2Cn%3A1967972031&bbn=1967936031&ie=UTF8&qid=1421390049&rnid=1967936031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967936031_nr_n_2/280-1606849-2685230?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967936031%2Cn%3A1967974031&bbn=1967936031&ie=UTF8&qid=1421390049&rnid=1967936031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967936031_nr_n_4/280-1606849-2685230?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967936031%2Cn%3A1967971031&bbn=1967936031&ie=UTF8&qid=1421390049&rnid=1967936031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967936031_nr_n_3/280-1606849-2685230?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967936031%2Cn%3A1967982031&bbn=1967936031&ie=UTF8&qid=1421390049&rnid=1967936031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967936031_nr_n_1/280-1606849-2685230?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967936031%2Cn%3A3659020031&bbn=1967936031&ie=UTF8&qid=1421390049&rnid=1967936031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967936031_nr_n_6/280-1606849-2685230?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967936031%2Cn%3A1967985031&bbn=1967936031&ie=UTF8&qid=1421390049&rnid=1967936031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967936031_nr_n_7/280-1606849-2685230?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967936031%2Cn%3A1967998031&bbn=1967936031&ie=UTF8&qid=1421390049&rnid=1967936031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967936031_nr_n_9/280-1606849-2685230?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967936031%2Cn%3A1968015031&bbn=1967936031&ie=UTF8&qid=1421390049&rnid=1967936031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967936031_nr_n_8/280-1606849-2685230?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967936031%2Cn%3A1968010031&bbn=1967936031&ie=UTF8&qid=1421390049&rnid=1967936031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967936031_nr_n_5/280-1606849-2685230?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967936031%2Cn%3A1967984031&bbn=1967936031&ie=UTF8&qid=1421390049&rnid=1967936031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967851031_nr_n_1/278-0753328-8125158?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967851031%2Cn%3A1967893031&bbn=1967851031&ie=UTF8&qid=1421390097&rnid=1967851031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967851031_nr_n_2/278-0753328-8125158?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967851031%2Cn%3A1967895031&bbn=1967851031&ie=UTF8&qid=1421390097&rnid=1967851031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967851031_nr_n_0/278-0753328-8125158?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967851031%2Cn%3A1967887031&bbn=1967851031&ie=UTF8&qid=1421390097&rnid=1967851031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967851031_nr_n_4/278-0753328-8125158?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967851031%2Cn%3A1967922031&bbn=1967851031&ie=UTF8&qid=1421390097&rnid=1967851031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967851031_nr_n_3/278-0753328-8125158?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967851031%2Cn%3A1967896031&bbn=1967851031&ie=UTF8&qid=1421390097&rnid=1967851031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1967851031_nr_n_5/278-0753328-8125158?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1967851031%2Cn%3A1967927031&bbn=1967851031&ie=UTF8&qid=1421390097&rnid=1967851031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953148031_nr_n_1/279-0397067-0519136?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953148031%2Cn%3A1953210031&bbn=1953148031&ie=UTF8&qid=1421390146&rnid=1953148031",
"Men and Women Clothing||http://www.amazon.in/s/ref=lp_1953148031_nr_n_0/279-0397067-0519136?fst=as%3Aoff&rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1953148031%2Cn%3A1953149031&bbn=1953148031&ie=UTF8&qid=1421390146&rnid=1953148031"]



function brandWise(Arr, callback){
	for(var i = 30; i < Arr.length ; i++){
		(function(i){
			var url = Arr[i].split("||")[1];
			console.log("Current Url : " + url);
			var category =  Arr[i].split("||")[0];

			var options = {uri : url, headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}};
			mainPage(options, category)

			if(i==(Arr.length-1)) callback();
			
		})(i);
	}
}

brandWise(urlCatArr, function(){console.log("Finished...!")});
