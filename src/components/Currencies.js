import React from "react";
import Currency from './Currency';

function Currencies({selectedCurrencies, calculateExchange, rates, ...props}) {
    let currencies;
    if (selectedCurrencies.length > 0) {
        currencies = selectedCurrencies.map(currency => {
            let {code} = currency;
            return (
                <Currency
                    key={code}
                    data={currency}
                    value={calculateExchange(code)}
                    rate={rates[code]}
                />
            );
        });
    } else {
        currencies = <li key={'CCC'} className='no-item'>Please Add Currency</li>;
    }
    return <ul className="currency-list">{currencies}</ul>;
}

export default Currencies;