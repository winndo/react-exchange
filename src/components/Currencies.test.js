import React from 'react';
import {render, fireEvent} from 'react-testing-library';
import Currencies from "./Currencies";

describe('Currencies', () => {
    let currenciesList = [];
    function getName(code) {
        return listNames[code];
    }
    it('render currency with no data', () => {
        const {getByText} = render(
            <Currencies
                selectedCurrencies={currenciesList}
                getName={getName}
                calculateExchange={calculateExchange}
                rates={rates}
            />
        );
        getByText('Please Add Currency');
    });
    const listNames = {
        'IDR': "Indenesian Rupiah",
        'EUR': "Euro"
    };
    const calculateExchange = jest.fn();
    const rates = {
        'IDR': 15291.65,
        'EUR': 0.87
    };
    const formattedRates = {
        'IDR': '15,291.65',
        'EUR': '0.87'
    };
    const filledCurrencies = ['IDR', 'EUR'];
    const {container, getByText, debug} = render(
        <Currencies
            selectedCurrencies={filledCurrencies}
            getName={getName}
            calculateExchange={calculateExchange}
            rates={rates}
        />
    );
    const currenciesNode = container.querySelector('ul.currency-list');

    it('render <Currencies />', () => {
        container.querySelector('ul.currency-list');
    });

    it('render as much selected currencies', () => {
        expect(currenciesNode.childElementCount).toBe(filledCurrencies.length);
    });

    it('calculate exchange', () => {
        expect(calculateExchange).toHaveBeenCalledTimes(2);
        expect(calculateExchange).toHaveBeenCalledWith('EUR');
        expect(calculateExchange).toHaveBeenCalledWith('IDR');
    });

    it('convert rate using rates object', () => {
        const rateEls = container.querySelectorAll('div.rate');
        expect(rateEls[0].innerHTML).toBe('1 USD = ' + formattedRates['IDR'] + ' IDR');
        expect(rateEls[1].innerHTML).toBe('1 USD = ' + formattedRates['EUR'] + ' EUR');
    });
});