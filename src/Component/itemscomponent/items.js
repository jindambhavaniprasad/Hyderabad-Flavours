import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Items = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://reqres.in/api/users?page=2')
            .then(res => {
                console.log(res.data.data);
                setUsers(res.data.data);
            });
    }, [])

    return (
        users.map(el => {
            return (
                    <div key={el.id} className="itemsList">
                        <div className="imageAvatar" onMouseOver={showDetails} onMouseOut={hideDetails}>
                            <img src={el.avatar} alt="" />
                        </div>
                        <div className="userDetails">
                            <div><i className="fa fa-angle-left arrowIcon"></i></div>
                            <div className="details">

                                <div className="Name">
                                    <p>{el.first_name}, {el.last_name}</p>
                                </div>
                                <div className="email">
                                    <p>Email:- {el.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        })
    )
}
function showDetails(event) {
    event.currentTarget.parentElement.querySelector('.userDetails').classList.add("details-display");
}
function hideDetails(event) {
    event.currentTarget.parentElement.querySelector('.userDetails').classList.remove("details-display");
}
export default Items;