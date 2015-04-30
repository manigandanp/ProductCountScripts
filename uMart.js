// Runthis code in Chrome Console - "http://www.umart.com.au/umart1/pro/Products_list.phtml?id=10&bid=3&id2=373"

var urlArr = []
$('li.li_menu_list_products a').each(function(i,hrf){
var url =$(this).attr('href');
if(url != undefined) urlArr.push("http://www.umart.com.au/umart1/pro/" +url)
})

var totalCount = 0;
for(var i= 0; i < urlArr.length; i++) {
(function(i){
	$.get(urlArr[i], function(res){var titleTxtCunt = jQuery('dl.dlone > dt a', res).length; 
	totalCount += titleTxtCunt;
 	console.log(i + " <--> " +urlArr[i] + " <--> " + titleTxtCunt + " <--> " + totalCount);});
 })(i)
}

