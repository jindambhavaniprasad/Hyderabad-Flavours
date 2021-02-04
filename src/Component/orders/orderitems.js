import React from 'react';

const OrderItems = (props) => {

    return (
        props.items && props.items.map(item => {
            return(
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
                    </div>
                    <div className="itemcounter order-itemtype">
                        <div className="itemtype">
                            <div className="typelabel"></div>
                            <p>{item.type}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            )
        })  
    )
}
export default OrderItems;