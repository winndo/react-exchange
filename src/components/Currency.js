import React from "react";
import {formatCurrency} from "./helper";

function Currency({code, title, value, rate, handleRemove}) {
    function remove() {
        handleRemove(code);
    }

    return (
        <li id={code} className="currency-item">
            <div className="title">{code} - {title}</div>
            <div className="code">{code}</div>
            <div className="value">
                {formatCurrency(value)}
            </div>
            <div className="rate">
                1 USD = {formatCurrency(rate)} {code}
            </div>
            <a href="#app-header" className="remove" onClick={remove}>
                X
            </a>
        </li>
    );
}

export default Currency;
