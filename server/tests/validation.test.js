const {isRealString} = require('../utils/validation');

describe('isRealString', () => {

    it('should reject non string values', function () {
        let str = 334;
        expect(isRealString(str)).toBe(false);

    });

    it('should reject string with only spaces', function () {
        expect(isRealString("     ")).toBe(false);

    });

    it('should allow string with non space character', function () {
        let str = '334_%$#billa';
        expect(isRealString(str)).toBe(true);

    });

});