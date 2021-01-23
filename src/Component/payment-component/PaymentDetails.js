import React from 'react';
import { Component } from 'react';

class PaymentDetails extends Component{

    render(){
        const cardNo = "";
        const cardCVV = "";
        const cardExp="";
        const{
            redirectToThankYou
        } = this.props
        return(
            <div className="payment">
                <div className="payment-form">
                    <input type="text" className="form-control" defaultValue={cardNo} placeholder="Card No."></input>
                    <input type="password" className="form-control" defaultValue={cardCVV} placeholder="CVV"></input>
                    <input type="date" className="form-control" defaultValue={cardExp}></input>
                    <button className="btn btn-success pay-button" onClick={redirectToThankYou}>Pay</button>
                </div>
            </div>
        )
    }
}
export default PaymentDetails;