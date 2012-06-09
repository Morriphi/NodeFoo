var customer = require("./lib/customers");

module.exports = {	
	index: function(req, res) {
		res.render('index.jade', 
		{	title: 'Express', 
			message: 'Express', 
			info: req.flash('info')
		});
	},
	node: function(req, res) {
		res.render('index.jade', 
		{	title: 'Node', 
			message: 'Node',
			info: req.flash('info')
		});
	},
	registerCustomer: function(req, res) {
		res.render('registration.jade', 
		{	title: 'Customer Registration', 
			message: 'Customer Registration',
			info: req.flash('info')
		});
	},
	createCustomer: function(req, res) {
		customer.onSuccessfulRegistration(function(customer){
			req.flash('info', 'Registration Completed Successfully, Email: ' + customer.email);
		});
		customer.onFailedRegistration(function(){
			req.flash('info', 'Registration Failed');
		});
		customer.register(req.body.email, req.body.password, req.body.confirmPassword);
		
		res.render('registration.jade',
		{	title: 'Customer Registration', 
			message: 'Customer Registration',
			info: req.flash('info')
		});
	},
  	register: function(app, callback)
	{
		app.get('/', this.index);
		app.get('/node', this.node);
		app.get('/register', this.registerCustomer);
		app.post('/register', this.createCustomer);
	}
};