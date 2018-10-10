function formatCurrency(number = 0) {
    return Number(number.toFixed(2)).toLocaleString('en-US');
}

export {formatCurrency}