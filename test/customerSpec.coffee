should = require("should")
customer = require("../lib/customers")

describe "Customer", ->
	registerdMessage = ''
	
	it "exists", ->
		should.exist(customer)
		
	it "has a register method", ->
		should.exist(customer.register)
	
	it "has a onSuccessfulRegistration method", ->
		should.exist(customer.onSuccessfulRegistration)
	
	it "has a onFailedRegistration method", ->
		should.exist(customer.onFailedRegistration)
	
	it "can register", ->
		customer.onSuccessfulRegistration (customer) ->
			registerdMessage = "Yay for " + customer.email
			
		customer.register 'test@email.com', 'pass', 'pass'
		should.equal registerdMessage, 'Yay for test@email.com'
	
	describe 'should not be able to register with', ->
		before (done) ->
			customer.onFailedRegistration ->
				registerdMessage = "fail"
			done()
		
		it "blank email", ->
			customer.register '', 'pass', 'pass'
			should.equal registerdMessage, 'fail'
			
		it "blank passwords", ->
			customer.register 'test@email.com', '', ''
			should.equal registerdMessage, 'fail'

		it "different passwords", ->
			customer.register 'test@email.com', 'password', 'pass'
			should.equal registerdMessage, 'fail'