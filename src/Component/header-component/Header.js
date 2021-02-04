import Modal from '@material-ui/core/Modal';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {

    const state = props;

    const [open, setOpen] = React.useState(false);

    const userlogout = () => {
        state.props.history.push("/login");
        localStorage.clear();
    }

    const handleOpen = () => {
        open === false ? setOpen(true) : setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const user = JSON.parse(localStorage.getItem("user"))
    const imageUrl = user.imageUrl;

    return (
        <div className="homepageheader">
            <div className="headername">
                <p>Sri Hyderabad Flavours</p>
            </div>
            <div className="profile-details">
                <div className="profilelogo">
                    <button className="btn profile-btn" onClick={handleOpen}><img src={imageUrl ? imageUrl : "https://image.flaticon.com/icons/png/512/64/64572.png"} alt="" className="profile-logo" /></button>
                    <Modal open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description">
                        <div className="profile-menu">
                            <div className="profile-menu-li">
                                <li>
                                    <div>
                                        <button className="btn profile-menu-btn">Profile</button>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <Link to="./myorders" className="btn profile-menu-btn">My Orders</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="logoutbtn">
                                        <button className="btn profile-menu-btn" onClick={userlogout}><p>Logout</p></button>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default Header;