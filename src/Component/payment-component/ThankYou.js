import React from 'react';
import { Component } from 'react';
import Header from '../header-component/Header';

class ThankYou extends Component {

    state = {
        paymentconfirmno: localStorage.getItem("paymentcnfirmNo")
    }

    render(){
        return(
            <div>
                <Header
                props = {this.props}/>
                <div className="thankyou">
                    <div className="thankyou-for-ordering">
                        <span className="thankyou-text">Thankyou for Ordering. Payment Confirmation Id: {this.state.paymentconfirmno}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default ThankYou;