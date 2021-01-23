import React from 'react'
import { Component } from 'react';
import ItemsSelected from './ItemsSelected';
import PaymentDetails from './PaymentDetails';
import Header from '../../Component/header-component/Header'

class Review extends Component{

    state ={
        grandTotal: 0,
        selectedItems: []
    }

    componentDidMount(){
        let grandTotal = 0;
        let selectedItems = [];
        JSON.parse(localStorage.getItem("selecteditems")).forEach(item => {
            item.itemTotal = Number(item.quantity) * Number(item.price)
            grandTotal = grandTotal + item.itemTotal;
            selectedItems.push(item);
        });

        this.setState({
            grandTotal: grandTotal,
            selectedItems: selectedItems
        })
    }

    redirectToThankYou(){
        this.props.history.push('/thankyou');
    }

    render(){        
        return(
           <div className="reviewpage">
                   <Header
                   props={this.props}/>
                   <div className="review-items">
                    <ItemsSelected
                    items = {this.state.selectedItems}
                    />
                    <div className="grandtotal-div">
                        <p className="grandtotal">Grand Total:- {this.state.grandTotal}</p>
                    </div>
                    <PaymentDetails 
                    redirectToThankYou={this.redirectToThankYou.bind(this)}/>
                   </div>
           </div>
        )
    }
}
export default Review;