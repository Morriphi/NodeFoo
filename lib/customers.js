var Customer = function() {
	var that = {}
	
	var emitter = require("events").EventEmitter;
	var events = new emitter();
			
	that.register = function(email, password, confirm) {
		events.emit('newRegistration', {email:email, password:password, confirm:confirm});
	};
	
	that.onSuccessfulRegistration = function(callback) {
		events.on("successfulRegistration", callback);
	};
	
	that.onFailedRegistration = function(callback) {
		events.on('failedRegistration', callback);
	}
	
	var validate = function (customer) {
		if(customer.password === customer.confirm)
			events.emit('validated', customer);
		else
			events.emit('failedRegistration');
	};
	
	var insert = function (customer) {
		events.emit('added', customer);
	};
	
	var sendEmail = function (customer) {
		events.emit('emailSend', customer);
	};
	
	var successfulRegistration = function(customer){
		events.emit('successfulRegistration', customer);
	};
	
	events.on('newRegistration', validate);
	events.on('validated', insert);
	events.on('added', sendEmail);
	events.on('emailSend', successfulRegistration);
			
	return that;
};

module.exports = Customer();
