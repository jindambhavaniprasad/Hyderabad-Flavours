import React from 'react'
import { Component } from 'react';
import ItemsSelected from './ItemsSelected';
import PaymentDetails from './PaymentDetails';
import Header from '../../Component/header-component/Header';
import firebase from '../../services/firebase.js'

class Review extends Component {

    state = {
        grandTotal: 0,
        selectedItems: [],
        phoneNO: JSON.parse(localStorage.getItem("user")).phoneNumber,
        confirmationResult: null,
        recaptcha: null
    }

    componentDidMount() {
        let grandTotal = 0;
        let selectedItems = [];
        const items = JSON.parse(localStorage.getItem("selecteditems"));
        items && items.forEach(item => {
            item.itemTotal = Number(item.quantity) * Number(item.price)
            grandTotal = grandTotal + item.itemTotal;
            selectedItems.push(item);
        });

        this.setState({
            grandTotal: grandTotal,
            selectedItems: selectedItems
        })
    }

    redirectToThankYou(event) {
        console.log(event.target);
        document.querySelector('.animation').style.display = "block";
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        const items = JSON.parse(localStorage.getItem("selecteditems"));
        let order = [];
        order.userid = user.userid;
        order.orderId = Math.floor(Math.random() * 1000000000);
        order.items = items;
        order.ordertotal = this.state.grandTotal;
        firebase.database().ref('Orders').push(order).then(() => {
            localStorage.setItem("paymentcnfirmNo", order.orderId);
            document.querySelector('.animation').style.display = "none";
            this.props.history.push('/thankyou');
        });
    }

    render() {
        return (
            <div className="reviewpage">
                <Header
                    props={this.props} />
                <div className="review-items">
                    <ItemsSelected
                        items={this.state.selectedItems}
                    />
                    <div className="grandtotal-div">
                        <p className="grandtotal">Grand Total:- {this.state.grandTotal}</p>
                    </div>
                    <PaymentDetails
                        redirectToThankYou={this.redirectToThankYou.bind(this)} />
                </div>
            </div>
        )
    }
}
export default Review;