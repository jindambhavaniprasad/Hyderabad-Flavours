import React from 'react'
import { Component } from 'react';
import firebase from '../../services/firebase.js'
import Header from '../header-component/Header.js';
import MyOrder from './myorder.js';

class Orders extends Component {

    state = {
        user : JSON.parse(localStorage.getItem("user")),
        myorders: [],
        items: null
    }

    componentWillMount(){
        let orders = [];
        firebase.database().ref('Orders').on("value", datasnap => {
            const allorders = datasnap.val();
            for(var key in allorders){
                if(allorders.hasOwnProperty(key)){
                    let order = allorders[key];
                    if(order.userid === this.state.user.userid){
                        orders.push(order);
                    }
                }
            }
            this.setState({
                myorders: orders
            },()=>{
                let items = <MyOrder orders={this.state.myorders}/>
                this.setState({
                    items:items
                })
            })
        })
    }
    render() {
        return (
            <div>
                <Header props={this.props}/>
                <p className="orders-heading">My Orders</p>
                <div>{this.state.items}</div>
            </div>
            
        )
    }
}
export default Orders;