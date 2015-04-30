 var request = require('request');
// var text = fs.readFileSync("./sample.json")
// var text = JSON.parse(text);
request("http://www.google.com", function(er,re,rp){
	console.log(rp);
})
console.log("Hello from..." );