var util = require('util');

module.exports = {
  	register: function(app, callback)
	{
		app.get('/', function(request, response) {
			response.render('index.jade', {
				title: 'Express'
				, message: util.format("Hello from %s and %s", "Node Js", "Express")
			});
		});
		
		app.get('/node', function(request, response) {
			response.render('index.jade', {
				title: 'Node'
				, message: util.format("Hello from %s and %s", "Node Js", "Express")
			});
		});

		callback(app);
	}
};