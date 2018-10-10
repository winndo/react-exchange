import React, {Component} from 'react';
import './App.scss';
import api from './api';
import BaseCurrency from './components/BaseCurrency';
import Currencies from './components/Currencies';


function AddCurrency(props) {
    return (
        <div className="add-currency">
            + Add Currency
        </div>
    )
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseCode: "USD",
            baseValue: 1,
            supportedCurrencies: api.currency.supported,
            listNames: {},
            date: '',
            rates: {},
            selectedCurrencies: [],
            loading: true
        };
        this.handleBaseValueChange = this.handleBaseValueChange.bind(this);
        this.calculateExchange = this.calculateExchange.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true});
        api.currency
            .listNames()
            .then(names => {
                this.setState({
                    listNames: names
                });
                return Promise.resolve();
            })
            .then(() => {
                return api.currency.listRates(
                    this.state.baseCode,
                    this.state.supportedCurrencies
                );
            })
            .then(data => {
                this.setState({
                    date: data.date,
                    rates: data.rates,
                    loading: false
                });
                return Promise.resolve();
            })
            .then(() => {
                // add initial list
                this.addCurrency("IDR")
                    .addCurrency("EUR")
                    .addCurrency("GBP");
            });
    }

    has(code) {
        return this.state.selectedCurrencies.find(
            currency => currency.code === code
        );
    }

    calculateExchange(code) {
        return this.state.rates[code] * this.state.baseValue;
    }

    addCurrency(code, callback) {
        if (this.has(code)) {
            console.log(`This currency code: ${code}, is already on the list`);
            return this;
        }
        let currencies = this.state.selectedCurrencies.slice();
        currencies.push({
            code: code,
            rate: this.state.rates[code],
            title: this.state.listNames[code],
            value: this.calculateExchange(code)
        });
        this.setState({
            selectedCurrencies: currencies
        }, callback);
        return this;
    }

    handleBaseValueChange({baseValue}) {
        this.setState({baseValue: baseValue});
    }

    render() {
        return (
            <div id="app">
                <header id="app-header">
                    <BaseCurrency
                        title={this.state.listNames[this.state.baseCode]}
                        code={this.state.baseCode}
                        date={this.state.date}
                        baseValue={this.state.baseValue}
                        handleChange={this.handleBaseValueChange}
                    />
                </header>
                <div id="main">
                    {this.state.loading ? (
                        <div>Loading...</div>
                    ) : (
                        <Currencies
                            selectedCurrencies={this.state.selectedCurrencies}
                            calculateExchange={this.calculateExchange}
                            rates={this.state.rates}
                        />
                    )}
                </div>
                <footer id="app-footer">
                    <AddCurrency/>
                </footer>
            </div>
        );
    }
}

export default App;
