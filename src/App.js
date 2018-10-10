import React, {Component} from 'react';
import './App.scss';
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
    return(
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
        };
        this.handleBaseValueChange = this.handleBaseValueChange.bind(this);
    }
    handleBaseValueChange({baseValue}) {
        this.setState({ baseValue: baseValue });
    }
    render() {
        return (
            <div id="App">
                <header id="app-header">
                    <BaseCurrency
                        title={'United States Dollar'}
                        code={this.state.baseCode}
                        date={''}
                        baseValue={this.state.baseValue}
                        handleChange={this.handleBaseValueChange}
                    />
                </header>
                <div id="main">
                    <Currencies/>
                </div>
                <footer id="app-footer">
                    <AddCurrency/>
                </footer>
            </div>
        );
    }
}

export default App;
