var express = require('express');
var routes = require('./routes');

var app = express.createServer(express.logger());

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
    app.use(express.compiler({ src: __dirname + '/public/styles', enable: ['sass'] }));
    app.use(express.static(__dirname + '/public/scripts'));
    app.use(express.static(__dirname + '/public/styles'));
    app.use(express.static(__dirname + '/public/images'));
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'wasdsafeAD' }));
	app.use(express.bodyParser());
});

routes.register(app);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});