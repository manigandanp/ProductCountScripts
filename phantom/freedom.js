var path = require('path'),
    childProcess = require('child_process'),
    phantomjs = require('phantomjs'),
    binPath = phantomjs.path,

    cheerio = require('cheerio'),
    //url = "http://www.freedom.com.au/",
    url = "http://www.freedom.com.au/homewares/bedroom/pillows-doonas-mattress-protectors/",
    childArgs = [path.join(__dirname, 'phantomScript.js'), url];

childProcess.execFile(binPath, childArgs, function(err, stOut, stErr){
	var $ = cheerio.load(stOut);
	$('.products h2>a').each(function(){console.log($(this).attr('href'))});
})
