var should = require("should");

describe("the nature of truth", function(){
	it("allows 1 to be 1", function(){
		var one = 1;
		one.should.equal(1);
	});
});