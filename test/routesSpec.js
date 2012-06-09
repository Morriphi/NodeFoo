var routes = require('../routes');
var should = require('should');

var request = function() {
	
	var obj = {};
	
	var messages = {};
	
	obj.flash = function(name, message) {
		if(message)
			messages[name] = message;
		else
			return messages[name];
	};

	return obj;
	
}();

var response = {
    viewName: ""
    , data : {}
    , render: function(view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};

describe('routes', function(){
	it('should GET default /', function(){
		routes.index(request, response);
		response.viewName.should.equal('index.jade');
		response.data.should.have.property('title', 'Express');
		response.data.should.have.property('message', 'Express');
		response.data.should.not.have.property('info');
	});
	it('should GET /node', function(){
		routes.node(request, response);
		response.viewName.should.equal('index.jade');
		response.data.should.have.property('title', 'Node');
		response.data.should.have.property('message', 'Node');
		response.data.should.not.have.property('info');
	});
	it('should GET /register', function(){
		routes.registerCustomer(request, response);
		response.viewName.should.equal('registration.jade');
		response.data.should.have.property('title', 'Customer Registration');
		response.data.should.have.property('message', 'Customer Registration');
		response.data.should.not.have.property('info');
	});
	it('should POST /register and create customer', function(){
		request.body = {};
		request.body.email = 'test@email.com';
		request.body.password = 'password';
		request.body.confirmPassword = 'password';
		routes.createCustomer(request, response);
		response.viewName.should.equal('registration.jade');
		response.data.should.have.property('title', 'Customer Registration');
		response.data.should.have.property('message', 'Customer Registration');
		response.data.should.have.property('info', 
		'Registration Completed Successfully, Email: test@email.com');
	});
	it('should POST /register and not create customer', function(){
		request.body = {};
		request.body.email = 'test@email.com';
		request.body.password = 'password';
		request.body.confirmPassword = 'pass';
		routes.createCustomer(request, response);
		response.viewName.should.equal('registration.jade');
		response.data.should.have.property('title', 'Customer Registration');
		response.data.should.have.property('message', 'Customer Registration');
		response.data.should.have.property('info', 'Registration Failed');
	});
});
