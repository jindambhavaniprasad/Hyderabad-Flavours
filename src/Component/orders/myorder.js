import React from 'react'
import { Component } from 'react';
import OrderItems from './orderitems';

class MyOrder extends Component {

    render() {
        const {
            orders
        } = this.props;
        return (
            orders.length > 0 ? orders.map(order => {
                return (
                    <div className="orders">
                        <div className="order-section">
                            <span>Order Id:- {order.orderId}</span>
                            <OrderItems items={order.items} />
                            <span>Order Total:- Rs. {order.ordertotal}</span>
                        </div>
                    </div>
                )

            }) : ""
        )
    }
}
export default MyOrder;