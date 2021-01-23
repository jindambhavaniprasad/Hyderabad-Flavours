import React from 'react';

const ItemsSelected = (props) => {

    return (
        props.items.map(item => {
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
                        <div className="itemprice">
                            <p>Price:- {item.price}</p>
                        </div>
                    </div>
                    <div className="itemcounter">
                        <div className="itemtype">
                            <div className="typelabel"></div>
                            <p>{item.type}</p>
                        </div>
                        <div className="itemprice">
                            <div><p className="itemtotal">ItemTotal: Rs. {item.itemTotal}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            )
        })  
    )
}
export default ItemsSelected;