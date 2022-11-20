let assert = require('assert');
describe('Array', function () {
	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function () {
			assert.equal([1, 2, 3].indexOf(4), -1);
		});
	});
});
describe('testing', function (){
	describe('multTest', function (){
		it('Should equal 15 when 5 x 3', function (){
			let result =  5*3;
			assert.equal(result, 15);
		})
	})
})
