import React, {Component} from 'react';
import './App.scss';

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

function BaseCurrency(props) {
    return (
        <div className="base-currency">
            Base Currency
        </div>
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
    render() {
        return (
            <div id="App">
                <header id="app-header">
                    <BaseCurrency/>
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
