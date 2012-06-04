var express = require('express');

var app = express.createServer(express.logger());

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
    app.use(express.compiler({ src: __dirname, enable: ['sass'] }));
});

app.get('/', function(request, response) {
	response.render('index.jade', {
		title: 'Express'
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});