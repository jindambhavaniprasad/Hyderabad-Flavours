import React from 'react'
import { Component } from 'react';

class MenuItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            menu: this.props.items,
            totalPrice: this.props.totalPrice
        }
    }

    increment(event) {
        event.persist();
        let itemPrice = Number(event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.itemprice p').innerHTML);
        let totalBasePrice = Number(this.state.totalPrice)
        this.setState({
            totalPrice: itemPrice + totalBasePrice
        }, () => {
            let itemQuantity = Number(event.target.parentElement.parentElement.querySelector('.countervalue').innerHTML);
            let itemQuantituUpdated = itemQuantity + 1;
            event.target.parentElement.parentElement.querySelector('.countervalue').innerHTML = itemQuantituUpdated;
        }
        )
    }

    decrement(event) {
        event.persist();
        let itemPrice = Number(event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.itemprice p').innerHTML);
        let totalBasePrice = Number(this.state.totalPrice)
        this.setState({
            totalPrice: totalBasePrice > 0 ? totalBasePrice - itemPrice : 0
        }, () => {
            let itemQuantity = Number(event.target.parentElement.parentElement.querySelector('.countervalue').innerHTML);
            let itemQuantituUpdated = itemQuantity > 0 ? itemQuantity - 1 : 0;
            event.target.parentElement.parentElement.querySelector('.countervalue').innerHTML = itemQuantituUpdated;
        }
        )
    }

    render() {
        const {
            items
        } = this.props;

        return (
            items != null && items.map(item => {
                return (
                    <div key={item.name} className={item.type.split(" ").join("")}>
                        <div className="itemcard">
                            <div className="itemimage">
                                <img src={item.image} className="itemImage" alt="" />
                            </div>
                            <div className="itemOrderDiv">
                                <div className="itemdetails">
                                    <div className="itemname">
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="itemtype">
                                        <p>{item.type}</p>
                                    </div>
                                    <div className="itemprice">
                                        <p>{item.price}</p>
                                    </div>
                                </div>
                                <div className="itemcounter">
                                    <div className="itemcounterinner">
                                        <button className="btn" onClick={this.decrement.bind(this)}><i className="fa fa-minus"></i></button>
                                        <span className="countervalue">0</span>
                                        <button className="btn" onClick={this.increment.bind(this)}><i className="fa fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            )
        );
    }
}
export default MenuItem;