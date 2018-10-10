import React from 'react';
import {render} from 'react-testing-library';
import AddCurrency from "./AddCurrency";
import api from '../api';

describe('AddCurrency', () => {
    const supportedCurrencies = api.currency.supported;
    const selectedCurrencies = supportedCurrencies.slice(0, 2);
    const remainingCurrencies = supportedCurrencies.slice(2);
    const handleAddClick = jest.fn();
    const {container, getByText, debug} = render(
        <AddCurrency
            currencies={selectedCurrencies}
            remainingCurrency={remainingCurrencies}
            addCurrency={handleAddClick}
        />
    );
    const btnNode = getByText('+ Add Currency');

    it('render <div class="add-currency">', () => {
        container.querySelector('div.add-currency')
    });
    it('add currency', )
});