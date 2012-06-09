var should = require("should");
var customer = require("../lib/customers");

describe("Customer", function(){
	it("exists", function(){
		should.exist(customer);
	});	
		
	it("has a register method", function(){
		should.exist(customer.register);
	});
	
	it("has a onSuccessfulRegistration method", function(){
		should.exist(customer.onSuccessfulRegistration);
	});
	
	it("can register", function() {
		var registerdMessage = '';
		customer.onSuccessfulRegistration(function(customer){
			registerdMessage = "Yay for " + customer.email;
		});
		customer.register('test@email.com', 'pass', 'pass');
		should.equal(registerdMessage, 'Yay for test@email.com');
	});
	
	it("should not be able to register with different passwords", function() {
		var registerdMessage = '';
		customer.onSuccessfulRegistration(function(customer){
			registerdMessage = "Yay for " + customer.email;
		});
		customer.onFailedRegistration(function(){
			registerdMessage = "Passwords must match!";
		});
		customer.register('test@email.com', 'password', 'pass');
		should.equal(registerdMessage, 'Passwords must match!');
	});
});