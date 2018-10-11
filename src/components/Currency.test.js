import React from 'react';
import {render} from 'react-testing-library';
import ReactDOM from 'react-dom';
import Currency, {formatCurrency} from "./Currency";

describe('Currency', () => {
    it('render <Currency />', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Currency data={{code: 'IDR'}}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    const data = {
        code: 'IDR',
        title: 'Indonesian Rupiah'
    };
    const value = {
        raw: 150000,
        formatted: '150,000'
    };
    const rate = {
        raw: 15000,
        formatted: '15,000'
    };
    const {container, getByText, debug} = render(<Currency code={data.code} title={data.title} value={value.raw} rate={rate.raw}/>);
    it('render code', () => {
        getByText(data.code)
    });
    it('render title', () => {
        container.querySelector('div.title');
    });
    it('render rate', () => {
        container.querySelector('div.rate');
    });
    it('render value', () => {
        container.querySelector('div.value');
    });
});