import React from 'react';
import {render, fireEvent} from 'react-testing-library';
import Currencies from "./Currencies";

describe('Currencies', () => {
    let currenciesList = [];
    it('render currency with no data', () => {
        const {getByText} = render(
            <Currencies
                selectedCurrencies={currenciesList}
                calculateExchange={calculateExchange}
                rates={rates}
            />
        );
        getByText('Please Add Currency');
    });

    const calculateExchange = jest.fn();
    const rates = {
        'IDR': 15291.65,
        'EUR': 0.87
    };
    const formattedRates = {
        'IDR': '15,291.65',
        'EUR': '0.87'
    };
    const filledCurrencies = [
        {
            code: 'IDR',
            rate: 15291.65,
            title: 'Indonesian Rupiah',
            value: 15291.65
        },
        {
            code: 'EUR',
            rate: 0.87,
            title: 'Euro',
            value: 0.87
        }
    ];
    const {container, getByText, debug} = render(
        <Currencies
            selectedCurrencies={filledCurrencies}
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
        expect(rateEls[0].innerHTML).toBe(formattedRates['IDR']);
        expect(rateEls[1].innerHTML).toBe(formattedRates['EUR']);
    });
});