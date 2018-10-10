import React from "react";

function BaseCurrency({title, code, date, baseValue, ...props}) {
    const handleInputChange = function (e) {
        props.handleChange({
            baseValue: e.target.value
        });
    };

    return (
        <div className="base-currency">
            <div className="title">
                {title || 'currency title'}
            </div>
            <div className="code">{code || '•••'}</div>
            <div className="date"><strong>last update:</strong> {date || 'no internet'}</div>
            <input
                autoFocus
                className="base-value"
                type="number"
                value={baseValue}
                onChange={handleInputChange}
                data-testid="base-value-input"
            />
        </div>
    );
}

export default BaseCurrency;