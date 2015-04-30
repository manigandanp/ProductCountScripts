// var baseArr //= [1,2,3]
// baseArr[0] = depth0_0;
// baseArr[1] = depth0_1;
// baseArr[2] = depth0_0;
// var depth = 3
// function basExtract(arr, depth){
// 	if(depth==1){
// 		for(var i=0; i<arr.length; i++){
// 			arr[i] = ["if " + arr[i]]
// 		}
// 		return arr
// 	}else{
// 		for(var j=0; j<arr.length; j++){
// 			arr[j] = ["else " + arr[j]]
// 			var tmpArr = basExtract(arr[j], depth-1)
// //			arr[j] += tmpArr
// 		}
// 		return arr
// 	}
// }

// console.log(
// 	basExtract(baseArr, depth) + ""	)


// var depth0 = ["depth0_0", "depth0_1", "depth0_2"];
// var depth1 = ["depth1_0", "depth1_1", "depth2_2"];
// var depth3 = ["depth3_0", "depth3_1", "depth3_2"];
console.log("Hello World");
//
//var elem1 = ["elem1_0", "elem1_1", "elem1_2"]
//var elem2 = ["elem2_0", "elem2_1", "elem2_2"]
//var elem3 = ["elem3_0", "elem3_1", "elem3_2"]
//
//var Elem1 = ["Elem1_0", "Elem1_1", "Elem1_2"]
//var Elem2 = ["Elem2_0", "Elem2_1", "Elem2_2"]
//var Elem3 = ["Elem3_0", "Elem3_1", "Elem3_2"]
//
//
//var depth2 = [elem1, elem2, elem3]
//var depth1 = [Elem1, Elem2, Elem3]
//
//var baseArr = [depth2, depth1]
//var depth = 5
//
//function basExtract(arr, depth){
//	console.log(arr)
//	if(depth==1){
//		// for(var i=0; i<arr.length; i++){
//		// 	arr[i] = ["if " + arr[i]]
//		// }
//		return arr
//	}else{
//		for(var j=0; j<arr.length; j++){
//			arr[j] = [arr[j]]
//			var tmpArr = basExtract(arr[j], depth-1)
////			arr[j] += tmpArr
//		}
//		return arr
//	}
//}
////console.log(baseArr);
//console.log(
//	basExtract(baseArr, depth) 	)

// var request = require('request');
// var cheerio = require('cheerio');
// var _ = require('underscore');
// var url = "http://www.sainsburys.co.uk/shop/gb/groceries"
// var options = {uri:url, headers:{'User-Agent':'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', 'Cookie' : "msuuid_529av24112=4A1E2149-D20D-4A5D-A5DF-7D3673492F0E; sc.UserId=0c8f8a02-0a60-46df-b7ae-b8b4ae0e591c; sbrycookie3=9333821; BIGipServersol-prod-pool-vs=3531647168.20480.0000; sbrycookie1=630263751; transferKey=c33905e9581a59753bf980dc0c94d78b871318fc; s_ev27=%5B%5B%27Direct%2520Load%27%2C%271426140722984%27%5D%2C%5B%27Direct%2520Load%27%2C%271426495925212%27%5D%5D; _caid=b12b89c6-089f-4de8-abb2-7af8264d0e2d; __utma=173804577.1743327899.1426140723.1426140723.1426495925.2; __utmc=173804577; __utmz=173804577.1426140723.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); Apache=10.173.10.10.1426495930345388; BIGipServera-eco-www-fltc-pool-p_80=1963699466.20480.0000; BIGipServera-eco-www-flt-pool-p_80=1712041226.20480.0000; s_nr=1426495937311-Repeat; bt_sc_serialize=14264959447925832971; s_vnum=1427826600990%26vn%3D3; bt_espot_var=; bt_productclickfrom=; sbrycookie2=Fdam5R4km; TS7d4e39=5a734eaaa5957017ef95336c3265d8c44efe9b3a9b2e2d0e5506bf20763edc6148590e0f951f76041e02bb7a517bec8f9e7386449cb15b1ad768837a60ac0ec5c95f5c8e26f49b0d3146ef5f1389de873146ef5f3fc7763435699e658bbda245e3d9645829848111c46e1c1b659c44163e94063a; s_cc=true; c=undefinedDirect%20LoadDirect%20Load; gpv_url=http%3A%2F%2Fwww.sainsburys.co.uk%2Fshop%2Fgb%2Fgroceries; s_invisit=true; s_pv=groceries%3Ahomepage; s_sq=; loginClicked=|; bt_espot_click=; bt_product_click=; sc.ASP.NET_SESSIONID=x4txvfhp4mnb2uydzr0hf53p; sc.Status=4; TS7d4e39_77=0352_c278579508a001d6_rsb_0_rs_http%3A%2F%2Fwww.sainsburys.co.uk%2Fshop%2Fgb%2Fgroceries_rs_1; s_ppv=-%2C100%2C42%2C2246"}};

// request(options, function(err, res, htm){
// 	var $ = cheerio.load(htm);
// 	console.log(htm);
// 		var regx= new RegExp(url, 'gim')
// 		var homeAnchor = {};
// 		$('a').each(function(i,e){ var tmpurl = $(this).attr('href').match(regx) != null ? $(this).attr('href') : ''; homeAnchor[tmpurl] = 0})
// 		console.log(Object.keys(homeAnchor))	;
// })

// var jsdom = require("jsdom");
// var config = {
// 	url : "http://www.google.com",
//   	scripts : ["http://code.jquery.com/jquery.js"],
//   	done : function (errors, window) {
//     		window.$('a').each(function(i,e){console.log(window.$(this).attr('href'))});

//   		}
// }

// jsdom.env(config);

// var len = 2
// for(var i=0; i<len ; i++) console.log(len = i + 4)

// function factorial(num)
// {
//     // If the number is less than 0, reject it.
//     if (num < 0) {
//     	console.log("if : " + num)
//         return -1;
//     }
//     // If the number is 0, its factorial is 1.
//     else if (num == 0) {
//     	console.log("else if : " + num)
//         return 1;
//     }
//     // Otherwise, call this recursive procedure again.
//     else {
//     	console.log("else : " + num)
//         return (num * factorial(num - 1));
//     }
// }


// function extract(arr, num)
// {
//     // If the number is less than 0, reject it.
//     if (num < 0) {
//     	//console.log("if : " + num)
//         return [];
//     }
//     // If the number is 0, its factorial is 1.
//     else if (num == 0) {
//     	//console.log("else if : " + num)
//         return [1,3,5,6,7];
//     }
//     // Otherwise, call this recursive procedure again.
//     else {
//     	//console.log("else : " + num)

//         return (arr.push(arr));
//     }
// }

// console.log(extract([3,4,5,6], 1))


//console.log("Last : " + factorial(5))

// (5 * (4 * (3 * ([2] * ([1])))) )

// (newArr.push())