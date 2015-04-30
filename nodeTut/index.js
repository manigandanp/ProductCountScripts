var http = require('http'),
	express = require('express'),
	path = require('path');

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){res.send('<html><head><title>Sample MonogoDB App</title></head><body><h1>MongoDB App</h1></body></html>')});

app.use(function(req,res){res.render('404',{url:req.url})});

http.createServer(app).listen(app.get('port'), function () {
	console.log('server is listening on '+ app.get('port'));
})