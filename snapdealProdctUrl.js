var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var fileName = "snapdeal_SamplPro.csv"
//var url = ["http://www.snapdeal.com/products/computers-laptops","http://www.snapdeal.com/products/computers-cooling-pads", "http://www.snapdeal.com/products/computers-keyboard"];
var url = ["http://www.snapdeal.com/products/mobiles-accessories",
"http://www.snapdeal.com/products/mobiles-power-banks",
"http://www.snapdeal.com/products/mobiles-mobile-phones",
"http://www.snapdeal.com/products/mobiles-bluetooth",
"http://www.snapdeal.com/products/mobiles-memory-cards",
"http://www.snapdeal.com/products/mobiles-cases-covers",
"http://www.snapdeal.com/products/mobiles-earphones",
"http://www.snapdeal.com/products/mobiles-value-added-services",
"http://www.snapdeal.com/products/mobiles-internationalsimcards",
"http://www.snapdeal.com/products/mobiles-batteries",
"http://www.snapdeal.com/products/mobiles-digital-goods",
"http://www.snapdeal.com/products/mobiles-screen-guards",
"http://www.snapdeal.com/products/mobiles-mobile-parts",
"http://www.snapdeal.com/products/mobiles-cables-chargers",
"http://www.snapdeal.com/products/computers-pen-drives",
"http://www.snapdeal.com/products/computers-monitors",
"http://www.snapdeal.com/products/computers-desktops",
"http://www.snapdeal.com/products/computers-graphic-cards",
"http://www.snapdeal.com/products/computers-external-hard-drives",
"http://www.snapdeal.com/products/computers-data-cards",
"http://www.snapdeal.com/products/computers-laptops",
"http://www.snapdeal.com/products/computers-components",
"http://www.snapdeal.com/products/computers-routers-modems",
"http://www.snapdeal.com/products/computers-computer-accessories",
"http://www.snapdeal.com/products/computers-ram",
"http://www.snapdeal.com/products/computers-processor",
"http://www.snapdeal.com/products/computers-printers-scanners",
"http://www.snapdeal.com/products/computers-software-cd-roms",
"http://www.snapdeal.com/products/computers-internal-hard-drives",
"http://www.snapdeal.com/products/computers-mouse",
"http://www.snapdeal.com/products/computers-cooling-pads",
"http://www.snapdeal.com/products/computers-adapters",
"http://www.snapdeal.com/products/computers-value-added-services",
"http://www.snapdeal.com/products/computers-headphones-mics",
"http://www.snapdeal.com/products/computers-batteries",
"http://www.snapdeal.com/products/computers-webcams",
"http://www.snapdeal.com/products/computers-keyboard",
"http://www.snapdeal.com/products/computers-speakers",
"http://www.snapdeal.com/products/mobiles-tablet-accessories",
"http://www.snapdeal.com/products/mobiles-tablets",
"http://www.snapdeal.com/campaign/281?categoryCode=appliances-air-conditioners",
"http://www.snapdeal.com/campaign/281?categoryCode=appliances-ups-stabilizers",
"http://www.snapdeal.com/campaign/281?categoryCode=appliances-washing-machines-dryers",
"http://www.snapdeal.com/campaign/281?categoryCode=appliances-refrigerator",
"http://www.snapdeal.com/campaign/281?categoryCode=appliances-fans-air-coolers",
"http://www.snapdeal.com/campaign/281?categoryCode=appliances-solar",
"http://www.snapdeal.com/campaign/281?categoryCode=appliances-geysers-immersion-rods",
"http://www.snapdeal.com/products/paintings",
"http://www.snapdeal.com/products/home-kitchen-home-decor",
"http://www.snapdeal.com/products/home-kitchen-religion-spirituality",
"http://www.snapdeal.com/products/home-kitchen-lamps",
"http://www.snapdeal.com/products/home-kitchen-candles-fragrances",
"http://www.snapdeal.com/products/home-kitchen-wall-decor",
"http://www.snapdeal.com/products/home-kitchen-clocks",
"http://www.snapdeal.com/products/women-apparel-salwar-suits",
"http://www.snapdeal.com/products/women-ethnicwear-saree-combos",
"http://www.snapdeal.com/products/women-apparel-dress-material",
"http://www.snapdeal.com/products/women-apparel-lehenga",
"http://www.snapdeal.com/products/women-apparel-kurtis",
"http://www.snapdeal.com/products/women-apparel-burqas",
"http://www.snapdeal.com/products/women-ethnicwear-blouse-petticoat",
"http://www.snapdeal.com/products/women-apparel-dupattas",
"http://www.snapdeal.com/products/women-apparel-salwars-churidars",
"http://www.snapdeal.com/products/women-apparel-sarees",
"http://www.snapdeal.com/products/women-apparel-winterwear",
"http://www.snapdeal.com/products/women-apparel-bottomwear",
"http://www.snapdeal.com/products/women-apparel-plus-sizes",
"http://www.snapdeal.com/products/women-apparel-tracksuits-trackpants",
"http://www.snapdeal.com/products/women-apparel-topwear",
"http://www.snapdeal.com/products/women-apparel-lingeriesleepwear",
"http://www.snapdeal.com/products/women-apparel-dresses",
"http://www.snapdeal.com/products/men-apparel-trousers",
"http://www.snapdeal.com/products/men-apparel-polo-tshirts",
"http://www.snapdeal.com/products/men-apparel-shirts",
"http://www.snapdeal.com/products/men-apparel-jeans",
"http://www.snapdeal.com/products/men-apparel-suitings-shirtings",
"http://www.snapdeal.com/products/men-apparel-trackpants-tracksuits",
"http://www.snapdeal.com/products/men-apparel-sweaters",
"http://www.snapdeal.com/products/men-apparel-sweatshirts",
"http://www.snapdeal.com/products/men-apparel-ethnic-wear",
"http://www.snapdeal.com/products/men-apparel-tshirts",
"http://www.snapdeal.com/products/men-apparel-plus-sizes",
"http://www.snapdeal.com/products/men-apparel-outerwear-jackets",
"http://www.snapdeal.com/products/men-apparel-shorts-cargos",
"http://www.snapdeal.com/products/men-apparel-sleep-loungewear",
"http://www.snapdeal.com/products/men-apparel-innerwear",
"http://www.snapdeal.com/products/baby-clothing-girls-dresses",
"http://www.snapdeal.com/products/baby-clothing-sweaters",
"http://www.snapdeal.com/products/baby-clothing-jackets",
"http://www.snapdeal.com/products/baby-clothing-tshirts-tops",
"http://www.snapdeal.com/products/baby-clothing-rompers",
"http://www.snapdeal.com/products/baby-clothing-sweatshirts",
"http://www.snapdeal.com/products/baby-clothing-top-bottom-sets",
"http://www.snapdeal.com/products/baby-clothing-jeans-pants",
"http://www.snapdeal.com/products/baby-clothing-shorts-capris",
"http://www.snapdeal.com/products/baby-clothing-ethnicwear",
"http://www.snapdeal.com/products/baby-clothing-innerwear",
"http://www.snapdeal.com/products/baby-clothing-leggings",
"http://www.snapdeal.com/products/baby-clothing-socks-mittens",
"http://www.snapdeal.com/products/baby-clothing-sets",
"http://www.snapdeal.com/products/baby-clothing-bibs-hankies",
"http://www.snapdeal.com/products/baby-clothing-winterwear",
"http://www.snapdeal.com/products/baby-clothing-boys-tshirts",
"http://www.snapdeal.com/products/baby-clothing-boys-bodysuits",
"http://www.snapdeal.com/products/baby-clothing-bottomwear",
"http://www.snapdeal.com/products/girls-clothing-tops-tshirts",
"http://www.snapdeal.com/products/girls-clothing-jackets",
"http://www.snapdeal.com/products/girls-clothing-sweatshirts",
"http://www.snapdeal.com/products/girls-clothing-sweaters",
"http://www.snapdeal.com/products/girls-clothing-frocks",
"http://www.snapdeal.com/products/girls-clothing-leggings",
"http://www.snapdeal.com/products/girls-clothing-bottomwear",
"http://www.snapdeal.com/products/girls-clothing-ethnicwear",
"http://www.snapdeal.com/products/girls-clothing-lehengas",
"http://www.snapdeal.com/products/girls-clothing-shorts",
"http://www.snapdeal.com/products/girls-clothing-skirts",
"http://www.snapdeal.com/products/girls-clothing-sets",
"http://www.snapdeal.com/products/girls-clothing-nightwear",
"http://www.snapdeal.com/products/girls-clothing-tracks",
"http://www.snapdeal.com/products/girls-clothing-accessories",
"http://www.snapdeal.com/products/girls-clothing-winterwear",
"http://www.snapdeal.com/products/girls-clothing-denims",
"http://www.snapdeal.com/products/girls-clothing-trousers-trackpants",
"http://www.snapdeal.com/products/girls-clothing-innerwear",
"http://www.snapdeal.com/products/girls-clothing-dresses",
"http://www.snapdeal.com/products/tweens-girls-clothing-lehengas-sarees",
"http://www.snapdeal.com/products/tweens-girls-clothing-dresses",
"http://www.snapdeal.com/products/tweens-girls-clothing-tops-tshirts",
"http://www.snapdeal.com/products/tweens-girls-clothing-leggings",
"http://www.snapdeal.com/products/tweens-girls-clothing-kurtis-salwar-suits",
"http://www.snapdeal.com/products/tweens-girls-clothing-skirts-shorts",
"http://www.snapdeal.com/products/tweens-girls-clothing-pants-cargos",
"http://www.snapdeal.com/products/tweens-girls-clothing-jeans",
"http://www.snapdeal.com/products/tweens-girls-clothing-sets",
"http://www.snapdeal.com/products/tweens-girls-clothing-jackets",
"http://www.snapdeal.com/products/tweens-girls-clothing-sweaters",
"http://www.snapdeal.com/products/tweens-girls-clothing-nightwear",
"http://www.snapdeal.com/products/tweens-girls-clothing-sweatshirts",
"http://www.snapdeal.com/products/tweens-girls-clothing-tracksuits",
"http://www.snapdeal.com/products/tweens-girls-clothing-innerwear",
"http://www.snapdeal.com/products/boys-clothing-sweaters",
"http://www.snapdeal.com/products/boys-clothing-jackets",
"http://www.snapdeal.com/products/boys-clothing-tshirts",
"http://www.snapdeal.com/products/boys-clothing-sweatshirts",
"http://www.snapdeal.com/products/boys-clothing-denims",
"http://www.snapdeal.com/products/boys-clothing-shirts",
"http://www.snapdeal.com/products/boys-clothing-ethnicwear",
"http://www.snapdeal.com/products/boys-clothing-shorts",
"http://www.snapdeal.com/products/boys-clothing-pants",
"http://www.snapdeal.com/products/boys-clothing-sets",
"http://www.snapdeal.com/products/boys-clothing-trackpants",
"http://www.snapdeal.com/products/boys-clothing-accessories",
"http://www.snapdeal.com/products/boys-clothing-nightwear",
"http://www.snapdeal.com/products/boys-clothing-innerwear",
"http://www.snapdeal.com/products/boys-clothing-shorts-bermudas",
"http://www.snapdeal.com/products/boys-clothing-trousers",
"http://www.snapdeal.com/products/boys-clothing-winterwear",
"http://www.snapdeal.com/products/tweens-boys-clothing-tshirts-polos",
"http://www.snapdeal.com/products/tweens-boys-clothing-jeans",
"http://www.snapdeal.com/products/tweens-boys-clothing-shirts",
"http://www.snapdeal.com/products/tweens-boys-clothing-pants-cargos",
"http://www.snapdeal.com/products/tweens-boys-clothing-kurta-pyjamas",
"http://www.snapdeal.com/products/tweens-boys-clothing-sets",
"http://www.snapdeal.com/products/tweens-boys-clothing-shorts",
"http://www.snapdeal.com/products/tweens-boys-clothing-tracksuits",
"http://www.snapdeal.com/products/tweens-boys-clothing-jackets-blazers",
"http://www.snapdeal.com/products/tweens-boys-clothing-nightwear",
"http://www.snapdeal.com/products/tweens-boys-clothing-sweaters",
"http://www.snapdeal.com/products/tweens-boys-clothing-sweatshirts",
"http://www.snapdeal.com/products/tweens-boys-clothing-suits-sherwanis",
"http://www.snapdeal.com/products/tweens-boys-clothing-accessories",
"http://www.snapdeal.com/products/tweens-boys-clothing-innerwear"]
//var url = ["http://www.snapdeal.com/products/mobiles-accessories"];
function prodUrl(urlArr, callback){
	for (var i = 0; i < urlArr.length; i++) {
		
		(function(i){
			var temp = urlArr[i];//"http://www.snapdeal.com/products/mobiles-accessories";
			var options = {uri : temp, headers:{"User-Agent": 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}};
			request(options, function(err, req, res){ 
				//var jsonObj = JSON.parse(res.match(/var jsonObj =(.*[\s\n\t]+.*)..afkit/)[1].replace(/;/g,""));
				var pageUrl = res.match(/"pageUrl":.+?,/gi);
				var prodUrlArr = [], tempData = "";
				if(res.match(/"pageUrl":.+?,/gi) != null){
					 for(var j = 0; j<6; j++){
					 	if( pageUrl[j] != undefined){
						 	prodUrlArr[j] = "http://www.snapdeal.com/" + pageUrl[j].replace(/[":,]/g,"").replace(/pageUrl/i,"").trim()
						 	//console.log(temp + " <----> "+ prodUrlArr[j]);
						 	tempData =prodUrlArr[j] + ","  +tempData;
						 	
						 }else {tempData = "Not Found pageUrl"}
					 }				
					 var data = '"' + temp +'","'+ tempData + '"\n';
					 fs.appendFileSync(fileName,data)
					 console.log(temp +" <---> " + tempData);
				}else{
					tempData = "Not Found";
					var data = '"' + temp +'","'+ tempData + '"\n';
					 fs.appendFileSync(fileName,data)
					 console.log(temp +" <---> " + tempData);
				}	 
			});

			 if(i == (urlArr.length - 1)) callback();
		})(i);
	}

}

console.log(url.length)
prodUrl(url, function(){console.log("finished..")});


/*request(options, function(error, reque, response){
				
				var $ = cheerio.load(response);
				console.log(response);
				var prodUrlArr = [];
				$('.productWrapper').each(function(j, href){
					if(j < 5){
						prodUrlArr[j] = $(this).parent().attr('href');
						var data = '"' + i +'","' + urlArr[i] + '","' + prodUrlArr[j] + '"\n';
						console.log(data);
						fs.appendFileSync(fileName, data);
					}
				});
			});

*/

/*

request(options, function(err, req, res){ 
				var jsonObj = JSON.parse(res.match(/var jsonObj =(.*[\s\n\t]+.*)..afkit/)[1].replace(/;/g,""));
				var counter = 0;
					for(var j = 0; jsonObj.length; j++){
						var k_Len = jsonObj[j].productDtos != undefined ? jsonObj[j].productDtos.length : 0;
						if(k_Len != 0){
						//console.log(jsonObj[10].productDtos[3].pageUrl);
							for(var k = 0 ; k_Len; k++){
								var l_Len = jsonObj[j].productDtos[k].pageUrl != undefined ? jsonObj[j].productDtos[k].pageUrl.length : 0;
								if(l_Len !=0){
									for(var l = 0; l_Len; l++){
										var prodUrlArr = [];
										if(counter < 5)	{prodUrlArr[counter] = jsonObj[j].productDtos[k].pageUrl[i]; counter++}
										else {break;}
									}
								}	

							}	
						}
					}
				

			});
			

*/