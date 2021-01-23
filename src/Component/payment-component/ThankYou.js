import React from 'react';
import { Component } from 'react';
import Header from '../header-component/Header';

class ThankYou extends Component {

    render(){
        return(
            <div>
                <Header
                props = {this.props}/>
                <div className="thankyou">
                    <div>
                        <p>Thank You For Ordering. Await a Delicious Treat</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default ThankYou;