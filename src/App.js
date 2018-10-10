import React, {Component} from 'react';
import './App.scss';
import api from './api';
import BaseCurrency from './components/BaseCurrency';

function Currencies(props) {
    return (
        <React.Fragment>
            Selected Currencies
            <ul className="currency-list">
                <li className="item">Currency Item</li>
                <li className="item">Currency Item</li>
                <li className="item">Currency Item</li>
                <li className="item">Currency Item</li>
                <li className="item">Currency Item</li>
            </ul>
        </React.Fragment>
    );
}

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
            loading: true
        };
        this.handleBaseValueChange = this.handleBaseValueChange.bind(this);
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
            });
    }

    handleBaseValueChange({baseValue}) {
        this.setState({baseValue: baseValue});
    }

    render() {
        return (
            <div id="App">
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
                        <Currencies/>
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
