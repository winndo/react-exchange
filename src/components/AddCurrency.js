import React, {Component} from 'react';

class AddCurrency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            selected: ''
        };
        this.handleAddBtn = this.handleAddBtn.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleSubmitBtn = this.handleSubmitBtn.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleCancelBtn = this.handleCancelBtn.bind(this);
    }

    handleAddBtn(e) {
        e.preventDefault();
        this.setState({addMode: true});
    }

    handleSelectChange(e) {
        this.add(e.target.value);
    }

    handleSubmitBtn() {
        this.add(this.state.selected);
    }

    add(code) {
        if (code !== "" && /\w{3}/.test(code) && this.props.currencies.indexOf(code) !== -1) {
            this.props.addCurrency(code, function () {
                let el = document.getElementById(code);
                if (el !== null) el.scrollIntoView(true);
            });
            this.setState({
                selected: '',
                addMode: false
            });
            console.log(`added ${code} to the list`);
        } else {
            console.log(`code must be 3 Capital word, or ${code} is not supported yet, or not exist`)
        }
    }

    handleInputChange(e) {
        let word = e.target.value.toUpperCase();
        this.setState({
            selected: word
        });
    }

    handleKeydown(e) {
        switch (e.keyCode) {
            case 13:
                console.log('enter');
                this.add(this.state.selected);
                break;
            case 27:
                console.log('esc');
                this.setState({addMode: false});
                break;
            default:
                break;
        }
    }

    handleItemClick(e) {
        e.preventDefault();
        const code = e.target.innerHTML;
        // console.log('code', code);
        this.add(code);
    }

    handleCancelBtn(e) {
        e.preventDefault();
        this.setState({addMode: false});
    }

    render() {
        let {remainingCurrencies: remaining} = this.props;
        let {selected} = this.state;

        if (!this.state.addMode) {
            document.removeEventListener('keydown', this.handleKeydown);
            if (remaining.length !== 0) {
                return (
                    <a href={'#ADD'} className="add-btn" onClick={this.handleAddBtn}>
                        + Add Currency
                    </a>
                );
            } else {
                return (
                    <div>All supported currencies are on the list</div>
                )
            }

        } else {
            let filteredCodes;
            if (selected !== '') {
                let regex = new RegExp('^' + selected, 'i');
                filteredCodes = remaining.filter(code => {
                    return code.match(regex);
                });
            } else {
                filteredCodes = remaining.slice();
            }
            let codes = filteredCodes.map(currency => {
                return (
                    <li key={currency} className="item">
                        <a href={'#' + currency} onClickCapture={this.handleItemClick} value={currency}>
                            {currency}
                        </a>
                    </li>
                );
            });

            document.addEventListener('keydown', this.handleKeydown);

            return (
                <div className="add-currency">
                    <div className="code-list-container">
                        <div className="header">Select Currency Code</div>
                        <div className="list-container">
                            <ul className="code-list">
                                {codes}
                            </ul>
                        </div>
                    </div>
                    <input autoFocus
                           maxLength={3}
                           type="text"
                           value={this.state.selected}
                           onChange={this.handleInputChange}
                    />
                    <button className="btn btn-submit" type="submit" onClick={this.handleSubmitBtn}>submit</button>
                    <button className="btn btn-cancel" type="submit" onClick={this.handleCancelBtn}>cancel</button>
                </div>
            )
        }
    }

}

export default AddCurrency;