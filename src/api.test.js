import api from './api';

describe('API', () => {

    describe('listNames', () => {
        let listNames = {};
        it('get list names of currencies', async () => {
            listNames = await api.currency.listNames();
        });
        it('have names for all supported currencies', () => {
            expect(api.currency.supported.every(code => {
                return listNames[code] !== undefined;
            })).toBe(true);
        });
    });

    describe('listRates', () => {
        const base = 'USD';
        it('get today exchange rate for supported currencies', async () => {
            let {date, rates} = await api.currency.listRates(base, api.currency.supported);
            expect(api.currency.supported.every(code => {
                return rates[code] !== undefined;
            })).toBe(true);
        });
    });
});