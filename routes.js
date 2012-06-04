module.exports = {
  	register: function(app, callback)
	{
		app.get('/', function(request, response) {
			response.render('index.jade', {
				title: 'Express'
			});
		});
		
		app.get('/node', function(request, response) {
			response.render('index.jade', {
				title: 'Node'
			});
		});

		callback(app);
	}
};