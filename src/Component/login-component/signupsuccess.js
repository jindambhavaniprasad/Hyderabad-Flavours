import { Link } from 'react-router-dom';
import React from 'react';
import { Component } from 'react';

class SignUpSuccess extends Component{
    render(){
        return(
            <div className="signupsuccess">
                <img src="https://icon-library.com/images/success-icon-png/success-icon-png-8.jpg" alt="Success"/>
                <p>Your Signup was success. Please Log in Again</p>
                <Link to="./login" className="btn btn-link">Login</Link>
            </div>
        )
    }
}
export default SignUpSuccess;