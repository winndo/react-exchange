import React from 'react';
import {render, fireEvent} from 'react-testing-library';
import BaseCurrency from './BaseCurrency';

describe('BaseCurrency', () => {
    const code = 'USD';
    const baseValue = 1;
    const date = '2018-08-08';
    const title = 'United States Dollar';
    const handleChange = jest.fn();
    
    const {container, debug} = render(<BaseCurrency
            title={title}
            code={code}
            date={date}
            baseValue={baseValue}
            handleChange={handleChange}
        />
    );

    it('had props code, date and title', () => {
        const titleNode = container.querySelector('div.title');
        const codeNode = container.querySelector('div.code');
        const dateNode = container.querySelector('div.date');

        expect(titleNode.innerHTML).toBe(title);
        expect(codeNode.innerHTML).toBe(code);
        expect(dateNode.innerHTML).toBe('<strong>last update:</strong> ' + date);
    });

    describe('input node', () => {
        const inputNode = container.querySelector('input.base-value');
        it('has initial base value of 1', () => {
            expect(inputNode.value).toEqual('1');
        });

        it('receive input from user and send it as object with "baseValue" property ', () => {
            fireEvent.change(inputNode, {target: {value: '1000'}});
            expect(handleChange).toHaveBeenCalledTimes(1);
            expect(handleChange).toHaveBeenCalledWith({baseValue: '1000'});
        })
    });
});