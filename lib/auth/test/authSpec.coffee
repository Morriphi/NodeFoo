auth = require('../authenticator')
should = require('should')

describe 'auth', ->
 it 'has a login method', ->
	should.exist(auth.login)