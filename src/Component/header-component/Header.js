import React from 'react';

const Header = (props) => {

    const state = props;

    const userlogout = () => {
        state.props.history.push("/login");
        localStorage.clear();
    }

    const showorHideProfileMenu = (event) => {
        const isDisplayed = document.querySelector('.profile-menu').style.display==="flex";
        if(isDisplayed){
            document.querySelector('.profile-menu').style.display="none";
        }else{
            document.querySelector('.profile-menu').style.display="flex";
            document.body.setAttribute('overflow','hidden');
        }
    }

    const user = JSON.parse(localStorage.getItem("user"))
    const imageUrl = user.imageUrl;

    return(
        <div className="homepageheader">
            <div className="headername">
            <p>Sri Hyderabad Flavours</p>
            </div>
            <div className="profile-details">
                <div className="profilelogo">
                <button className="btn profile-btn" onClick={showorHideProfileMenu.bind(this)}><img src={imageUrl ? imageUrl : "https://image.flaticon.com/icons/png/512/64/64572.png"} alt="" className="profile-logo"/></button>
                <ul className="profile-menu">
                    <li>
                        <div>
                            <button className="btn profile-menu-btn">Profile</button>
                        </div>
                    </li>
                    <li>
                        <div>
                            <button className="btn profile-menu-btn">My Orders</button>
                        </div>
                    </li>
                    <li>
                        <div className="logoutbtn">
                         <button className="btn profile-menu-btn" onClick={userlogout}><p>Logout</p></button>
                        </div>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    )
}
export default Header;