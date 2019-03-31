import React, { Component } from "react";
import "./App.scss";
import api from "./api";
import { ErrorBoundary } from "./components/helper";
import BaseCurrency from "./components/BaseCurrency";
import Currencies from "./components/Currencies";
import AddCurrency from "./components/AddCurrency";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseCode: "USD",
            baseValue: 1,
            supportedCurrencies: api.currency.supported.slice(),
            listNames: {},
            date: "",
            rates: {},
            selectedCurrencies: [],
            remainingCurrencies: api.currency.supported.slice(),
            loading: true
        };
        this.handleBaseValueChange = this.handleBaseValueChange.bind(this);
        this.calculateExchange = this.calculateExchange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.getName = this.getName.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
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
        currencies.push(code);
        const index = this.state.remainingCurrencies.indexOf(code);
        let remaining = this.state.remainingCurrencies.slice();
        remaining.splice(index, 1);
        this.setState(
            {
                selectedCurrencies: currencies,
                remainingCurrencies: remaining
            },
            callback
        );
        return this;
    }

    handleBaseValueChange({ baseValue }) {
        this.setState({ baseValue: baseValue });
    }

    handleAddClick(code, callback) {
        this.addCurrency(code, callback);
    }

    handleRemove(code) {
        let selected = this.state.selectedCurrencies.slice();
        const index = selected.indexOf(code);
        selected.splice(index, 1);
        let remaining = this.state.remainingCurrencies.slice();
        remaining.push(code);

        this.setState({
            selectedCurrencies: selected,
            remainingCurrencies: remaining
        });
    }

    getName(code) {
        return this.state.listNames[code];
    }

    render() {
        return (
            <ErrorBoundary>
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
                            <div className="loading-container">Loading...</div>
                        ) : (
                            <Currencies
                                selectedCurrencies={
                                    this.state.selectedCurrencies
                                }
                                getName={this.getName}
                                calculateExchange={this.calculateExchange}
                                handleRemove={this.handleRemove}
                                rates={this.state.rates}
                            />
                        )}
                    </div>
                    <footer id="app-footer">
                        <AddCurrency
                            currencies={this.state.supportedCurrencies}
                            remainingCurrencies={this.state.remainingCurrencies}
                            addCurrency={this.handleAddClick}
                        />
                    </footer>
                </div>
            </ErrorBoundary>
        );
    }
}

export default App;
