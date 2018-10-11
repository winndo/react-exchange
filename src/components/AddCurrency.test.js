import React from 'react';
import {render, fireEvent} from 'react-testing-library';
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
            remainingCurrencies={remainingCurrencies}
            addCurrency={handleAddClick}
        />
    );
    const btnNode = getByText('+ Add Currency');

    it('render <div class="add-currency">', () => {
        container.querySelector('div.add-currency')
    });
    it('has button + add currency at first', () => {
        getByText('+ Add Currency');
    });
    it('clicking "add currency" button open input and submit for adding currency', () => {
        fireEvent.click(btnNode);
        container.querySelector('button.btn-submit');
        container.querySelector('button.btn-cancel');
        container.querySelector('ul.code-list');
    });
});