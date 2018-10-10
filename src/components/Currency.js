import React from "react";
import {formatCurrency} from "./helper";

function Currency({data, value, rate}) {
    const {code, title} = data;
    return (
        <li id={code} className="currency-item">
            <div className="title">{title}</div>
            <div className="code">{code}</div>
            <div className="value">
                {formatCurrency(value)}
            </div>
            <div className="rate">
                {formatCurrency(rate)}
            </div>
        </li>
    );
}

export default Currency;
