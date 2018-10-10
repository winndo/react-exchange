import React, { Component } from 'react';

function formatCurrency(number = 0) {
    return Number(number.toFixed(2)).toLocaleString('en-US');
}

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: {},
            info: {}
        }
    }
    componentDidCatch(err, info) {
        this.setState({
            hasError: true,
            error: err,
            info: info
        });
        console.log('error', err, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{textAlign: 'center'}}>
                    <h1>Something went wrong</h1>
                    <p>
                        "{this.state.error.name}"
                    </p>
                    <pre style={{textAlign: 'left'}}>{this.state.info.componentStack}</pre>
                </div>
            )
        }
        return this.props.children;
    }
}

export {formatCurrency, ErrorBoundary};