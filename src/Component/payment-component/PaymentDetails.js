import React from 'react';
import { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class PaymentDetails extends Component {

    state = {
        cardNo: "",
        CVV: "",
        expDate: ""
    }

    handleCardNoChange(event) {
        let val = event.target.value;
        var v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{4,16}/g);
        var match = (matches && matches[0]) || ''
        var parts = []

        for (var i=0, len=match.length; i<len; i+=4) {
            parts.push(match.substring(i, i+4))
        }

        if (parts.length) {
            val = parts.join('-')
        }
        this.setState({
            cardNo : val
        })
    }
    handleCVVNoChange(event) {
        let val = event.target.value;
        if(val.length > 3){
            val = val.substring(0,3);
        }
        this.setState({
            CVV: val
        })
    }
    handleExpDateChange(event) {
        let val = event.target.value;
        var v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{0,4}/g);
        var match = (matches && matches[0]) || ''
        var parts = []

        for (var i=0, len=match.length; i<len; i+=2) {
            parts.push(match.substring(i, i+2))
        }

        if (parts.length) {
            val = parts.join('/')
        }
        this.setState({
            expDate : val
        })
    }

    render() {
        const {
            redirectToThankYou
        } = this.props
        return (
            <div className="payment">
                    <form onSubmit={redirectToThankYou} className="payment-form">
                        <p className="payment-details">Payment Details</p>
                        <TextField label="Card No." variant="outlined" value={this.state.cardNo} onChange={this.handleCardNoChange.bind(this)} required />
                        <TextField label="CVV" type="password" variant="outlined" value={this.state.CVV} onChange={this.handleCVVNoChange.bind(this)} required/>
                        <TextField label="Exp Month & Year" variant="outlined" value={this.state.expDate} onChange={this.handleExpDateChange.bind(this)} required/>
                        <button className="btn btn-success pay-button" type="submit">Pay</button>
                    </form>
            </div>
        )
    }
}
export default PaymentDetails;