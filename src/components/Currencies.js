import React from "react";
import Currency from './Currency';

function Currencies({selectedCurrencies, calculateExchange, rates, ...props}) {
    let currencies;
    if (selectedCurrencies.length > 0) {
        currencies = selectedCurrencies.map(code => {
            return (
                <Currency
                    key={code}
                    code={code}
                    title={props.getName(code)}
                    value={calculateExchange(code)}
                    rate={rates[code]}
                    handleRemove={props.handleRemove}
                />
            );
        });
    } else {
        currencies = <li key={'CCC'} className='no-item'>Please Add Currency</li>;
    }
    return <ul className="currency-list">{currencies}</ul>;
}

export default Currencies;