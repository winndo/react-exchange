import $ from 'jquery';
const logName = '[API] ';

const api = {
    currency: {
        supported: [
            "USD",
            "CAD",
            "IDR",
            "GBP",
            "CHF",
            "SGD",
            "INR",
            "MYR",
            "JPY",
            "KRW",
            "EUR"
        ],
        listNames() {
            return new Promise(function (resolve, reject) {
                $.get('https://openexchangerates.org/api/currencies.json', function (data) {
                    if (data) {
                        resolve(data);
                    } else {
                        reject(data)
                    }
                })
                    .done(function() {
                        console.log(logName, 'finish getting currency names');
                    })
                    .fail(function() {
                        reject(arguments);
                    });
            });
        },
        listRates(base, codes) {
            let stringOfCodes = codes.join(',');
            return new Promise(function (resolve, reject) {
                $.get(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${stringOfCodes}`, function (data) {
                    if (data) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
                    .done(function () {
                        console.log(logName, 'finish getting symbols');
                    })
                    .fail(function () {
                        reject(arguments);
                    })
            });
        }
    }
};

export default api;