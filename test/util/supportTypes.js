const supportTypes = require("../../util/supportTypes").SupportTypes;
let chai = require("chai");
const assert = chai.assert;
chai.should();


describe('Util: Support Types', function () {
    describe('getSupportType', function () {
        it('test: return type of getSupportType', function () {
            const returnValue = supportTypes.getSupportType(1)
            assert.typeOf(returnValue,"string")
        });

        it('test: return value of getSupportType', function () {
            const returnValue = supportTypes.getSupportType(0)
            assert.equal(returnValue,"Agricultural Support");
        });

        it('test: return value of getSupportType', function () {
            const returnValue = supportTypes.getSupportType(1)
            assert.equal(returnValue,"Technical Support");
        });

        it('test: return value of getSupportType', function () {
            const returnValue = supportTypes.getSupportType(2)
            assert.equal(returnValue,"Report an Issue");
        });

        it('test: return value of getSupportType', function () {
            const returnValue = supportTypes.getSupportType(3)
            assert.equal(returnValue,"Marketplace Support");
        });
    });

});
