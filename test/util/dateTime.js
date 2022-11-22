const dateTime = require("../../util/dateTime").DateTime;
let chai = require("chai");
const assert = chai.assert;
chai.should();


describe('Util: DateTime', function () {
	describe('getDBreadyCurrentDateTime', function () {
		it('test: return type of getDBreadyCurrentDateTime', function () {
			const returnValue = dateTime.getDBreadyCurrentDateTime()
			assert.typeOf(returnValue,"string")
		});
	});

	describe('convertToLocalDateTime', function () {
		it('test: return type of convertToLocalDateTime', function () {
			const returnValue = dateTime.convertToLocalDateTime()
			assert.typeOf(returnValue,"undefined");
		});
	});
});
