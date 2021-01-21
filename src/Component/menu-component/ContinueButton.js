import React from 'react';
import { Component } from 'react';

class ContinueButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            totalPrice: this.props.totalPrice
        }
    }
    render() {
        return(
            <div className="continuebuttonDiv">
                <button className="btn btn-primary">
                    Continue to Pay {this.state.totalPrice}
                </button>
            </div>
        );
    }
}
export default ContinueButton;