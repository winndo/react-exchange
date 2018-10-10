import {formatCurrency} from "./helper";

describe('formatCurrency', () => {
    it('return 0 when number argument is undefined', () => {
        expect(formatCurrency()).toEqual('0');
    });
    it('convert locale format "en-US" e.g. 1000 to 1,000.00', () => {
        expect(formatCurrency(1000)).toEqual('1,000');
    });
    it('convert to 2 fraction digit when needed e.g. 1000.01 to 1,000.01', () => {
        expect(formatCurrency(1000.01)).toEqual('1,000.01');
    });
});