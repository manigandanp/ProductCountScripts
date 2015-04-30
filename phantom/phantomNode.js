var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path

var cheerio = require('cheerio');
var _ = require('underscore');
 
var url = "http://www.sainsburys.co.uk/shop/gb/groceries/"
var childArgs = [path.join(__dirname, 'phantomScript.js'), url]
var allUrlArr = [], tempArr = [];
 
childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
	var body = stdout; 
	var $ = cheerio.load(body);
	//$('a').each(function(){var tmp = $(this).attr('href'); console.log(tmp)})
	var regx= new RegExp(url, 'gim')
	var homeAnchor = {};
	$('a').each(function(i,e){ var tmpurl = $(this).attr('href').match(regx) != null ? $(this).attr('href') : ''; homeAnchor[tmpurl] = 0})
	var allAnchor = _.reject(Object.keys(homeAnchor), function(e){return e == ''})
	allUrlArr.push(allAnchor);
	for(var lnkInd = 0; lnkInd<allAnchor.length; lnkInd++){
		var pattern = url;
		var newAllAnchors = extract(binPath, childArgs, pattern);
		allUrlArr.push(newAllAnchor);
		console.log("From loop : " + allUrlArr)
	}
	console.log("From End... " + allUrlArr)
})

function extract(binPath, childArgs, pattern){
	childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
		var body = stdout; 
		var $ = cheerio.load(body);
		//$('a').each(function(){var tmp = $(this).attr('href'); console.log(tmp)})
		var regx= new RegExp(pattern, 'gim')
		var homeAnchor = {};
		$('a').each(function(i,e){ var tmpurl = $(this).attr('href').match(regx) != null ? $(this).attr('href') : ''; homeAnchor[tmpurl] = 0})
		var allAnchor = _.reject(Object.keys(homeAnchor), function(e){return e == ''})
		console.log(allAnchor);
		return allAnchor
		
	});

}
