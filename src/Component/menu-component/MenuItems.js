import React from 'react'
import { Component } from 'react';

class MenuItem extends Component {

    render() {
        const {
            items,
            onIncrement,
            onDecrement,
        } = this.props;

        return (
            (items != null && items !== "") && items.map((item, index) => {
                return (
                    <div key={item.name} id={index} className={item.type.split(" ").join("")}>
                        <div className="itemcard">
                            <div className="itemimage">
                                <img src={item.image} className="itemImage" alt="" />
                            </div>
                            <div className="itemOrderDiv">
                                <div className="itemdetails">
                                    <div className="itemname">
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="itemprice">
                                        <p>Price:- {item.price}</p>
                                    </div>                                    
                                </div>
                                <div className="itemcounter">
                                    <div className="itemtype">
                                        <div className="typelabel"></div>
                                        <p>{item.type}</p>
                                    </div>
                                    <div className="itemcounterinner">
                                        <button className="btn decrementBtn" onClick={onDecrement} disabled={item.quantity === 0} id={index}><i className="fa fa-minus" id={index}></i></button>
                                        <span className="countervalue">{item.quantity}</span>
                                        <button className="btn incrementBtn" onClick={onIncrement} id={index}><i className="fa fa-plus" id={index}></i></button>
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