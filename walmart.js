this.matches = function(pageUrl) {
  return pageUrl.indexOf("www.walmart.com") != -1;
};

this.product_parser = function(pageUrl, F$, F_) {
  var result = {};
  var self = this;

  var title = F_.removeMultipleSpaces(F$("h1").text());
  F_.set(result, 'title', title);



  if(result["additionalAttributes"] === undefined) {
    result["additionalAttributes"] = [];
  }

  F$("div.specs-table tr").each(function(index) {

  var variant = F$("div.specs-table tr")[index];

  var list1 = {};

  (function(result) {
    (function(result, context) {
    self.v1 = F$("td:nth-child(1)", context).text();
    })(result, variant);

    (function(result, context) {
    self.v2 = F$("td:nth-child(2)", context).text();
    F_.set(result, self.v1, self.v2);
    })(result, variant);

  })(list1);
  
  result["additionalAttributes"].push(list1);
  });
  result["additionalAttributes"] = F_.toMap(result["additionalAttributes"])

  return result;
};



/*

// Kohls product_parser


Parser: product_parser
Site: www.kohls.com
Author: Ashwanth Kumar <ashwanth@indix.com>

Select '.title'
 Extract ATTR ownText as title

Select '.prod_description'
 Extract TEXT as smallDescription

Select 'meta[property="og:image"]'
 Extract ATTR content as imageUrl

Select 'meta[property="og:url"]'
 Extract ATTR content using REGEX('prd-([^/]{1,})') as sku

Select 'ul#alt-image-list img'
 List as additionalImageUrls  Extract ATTR src as additionalImageUrls

Select '.title > div.sale'
 Extract TEXT using CLEAN as minSalePrice
Select '.original'
 Extract TEXT using CLEAN as minSalePrice

Select '.original'
 Extract TEXT using CLEAN as minListPrice
Select 'ul#product-matrix > li > div.pmi-wrap > div.product-info > p.price-original'
 Extract TEXT using CLEAN as minListPrice



*/