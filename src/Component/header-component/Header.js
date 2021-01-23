import React from 'react';

const Header = (props) => {

    const state = props;

    const userlogout = () => {
        state.props.history.push("/login");
        localStorage.removeItem("username");
        localStorage.removeItem("userimage");
    }

    const imageUrl = localStorage.getItem("userimage");

    return(
        <div className="homepageheader">
            <div className="headername">
            <p>Sri Hyderabad Flavours</p>
            </div>
            <div className="profile-details">
                <div className="profilelogo">
                <button className="btn"><img src={imageUrl ? imageUrl : "https://image.flaticon.com/icons/png/512/64/64572.png"} alt="" className="profile-logo"/></button>
                </div>
                <div className="logoutbtn">
                    <button className="btn" onClick={userlogout}><p>Logout</p></button>
                </div>
            </div>
        </div>
    )
}
export default Header;