this.matches = function(pageUrl) {
  return pageUrl.indexOf("www.mpgear.com") != -1;
};

this.product_parser = function(pageUrl, F$, F_) {
  var result = {};
  var self = this;

  if(result["categoryTexts"] === undefined) {
    result["categoryTexts"] = [];
  }

  F$(".breadcrumbs a").each(function(index) {

  var variant = F$(".breadcrumbs a")[index];

  var list1 = {};

  (function(result) {



    var categoryTexts = F_.removeMultipleSpaces(F$(variant).text());
    F_.set(result, 'categoryTexts', categoryTexts);


  })(list1);
  result["categoryTexts"].push(list1);
  });
  
  


  var title = F_.removeMultipleSpaces(F$("div#item-details > h1.title").text());
  F_.set(result, 'title', title);



  var imageUrl = F_.removeMultipleSpaces(F$("meta[property=\"og:image\"]").attr("content"));
  F_.set(result, 'imageUrl', imageUrl);



  var smallDescription = F_.removeMultipleSpaces(F$("meta[property=\"og:description\"]").attr("content"));
  F_.set(result, 'smallDescription', smallDescription);



  var longDescription = F_.removeMultipleSpaces(F$("div#item-description").text());
  F_.set(result, 'longDescription', longDescription);



  var specificationText = F_.removeMultipleSpaces(F$("div#item-description").text());
  F_.set(result, 'specificationText', specificationText);



  var sku = F_.removeMultipleSpaces(F$("div#item-prices .item-sku").text());
  F_.set(result, 'sku', sku);



  var additionalAttributes = F_.removeMultipleSpaces(F$("div.part-tab-info").text());
  F_.set(result, 'additionalAttributes', additionalAttributes);



  var minSalePrice = F_.removeMultipleSpaces(F$("strike").text());
  var minSalePrice = F_.cleanNumber(minSalePrice);
  F_.set(result, 'minSalePrice', minSalePrice);



  var minSalePrice = F_.removeMultipleSpaces(F$(".clearfix > li > span").text());
  var minSalePrice = F_.cleanNumber(minSalePrice);
  F_.set(result, 'minSalePrice', minSalePrice);



  var minSalePrice = F_.removeMultipleSpaces(F$("span#store_price").text());
  var minSalePrice = F_.cleanNumber(minSalePrice);
  F_.set(result, 'minSalePrice', minSalePrice);



  var minSalePrice = F_.removeMultipleSpaces(F$("span[class=price]").text());
  var minSalePrice = F_.cleanNumber(minSalePrice);
  F_.set(result, 'minSalePrice', minSalePrice);



  var title = F_.removeMultipleSpaces(F$("meta[property=\"og:title\"]").attr("content"));
  F_.set(result, 'title', title);



  var imageUrl = F_.removeMultipleSpaces(F$("meta[itemprop=\"og:image\"]").attr("content"));
  F_.set(result, 'imageUrl', imageUrl);



  if(result["additionalAttributes"] === undefined) {
    result["additionalAttributes"] = [];
  }

  F$("div.item-description table.specTable tr").each(function(index) {

  var variant = F$("div.item-description table.specTable tr")[index];

  var list2 = {};

  (function(result) {
    (function(result, context) {
    self.v1 = F_.removeMultipleSpaces(F$("p").text());
    self.v1 = F_.textFromRegEx(self.v1, "(.*?):");
    })(result, variant);
    (function(result, context) {
    self.v2 = F_.removeMultipleSpaces(F$("p > strong").text());
    self.v2 = F_.textFromRegEx(self.v2, ":(.*):.?");
    F_.set(result, self.v1, self.v2);
    })(result, variant);

  })(list2);
  result["additionalAttributes"].push(list2);
  });
  
  
  result["additionalAttributes"] = F_.toMap(result["additionalAttributes"])
  


  var sku = F_.removeMultipleSpaces(F$("p.item-sku").text());
  F_.set(result, 'sku', sku);


  return result;
};


/*


Select 'div.item-description table.specTable tr'
 List using TOMAP as additionalAttributes
  Relative 'td p'
   Variable TEXT as v1
  Relative 'td  p  strong'
   Variable TEXT as v2
   Set v2 as v1

*/

Select 'div.specs-table tr'
 List using TOMAP as additionalAttributes
  Relative 'td:nth-child(1)'
   Variable TEXT as v1
  Relative 'td:nth-child(2)'
    Variable TEXT as v2
    Set v2 as v1