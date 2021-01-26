import { Button, TextField } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import firebase from '../../services/firebase.js';

class SignUp extends Component {

    state = {
        fullname: "",
        userid: "",
        password: "",
        confirmpassword: "",
        error: false,
        doesPasswordsMatch: true
    }

    handleNameChange(event) {
        const val = event.target.value;
        this.setState({
            fullname: val,
            error: false
        })
    }

    handleUserIdChange(event) {
        const val = event.target.value;
        this.setState({
            userid: val,
            error: false
        })
    }

    handlePasswordChange(event) {
        const val = event.target.value;
        this.setState({
            password: val,
            error: false,
            doesPasswordsMatch: val === this.state.confirmpassword
        })
    }

    handleConfirmPasswordChange(event) {
        const val = event.target.value;
        this.setState({
            confirmpassword: val,
            error: false,
            doesPasswordsMatch: this.state.password === val
        })
    }

    signup(event) {
        event.preventDefault();
        document.querySelector('.animation').style.display = "block";
        let exists = false;
        let user = [];
        user.Name = this.state.fullname;
        user.userid = this.state.userid;
        user.password = this.state.password;
        user.acctype = "user";
        console.log(user);
        if (this.state.doesPasswordsMatch) {
            firebase.database().ref('Users').on("value", datasnap => {
                const users = datasnap.val();
                for (var key in users) {
                    if (users.hasOwnProperty(key)) {
                        let user = users[key];
                        if (user.userid === this.state.userid && user.password === this.state.password) {
                            exists = true;
                        }
                    }
                }
                if (!exists) {
                    firebase.database().ref('Users').push(user).then(() => {
                        this.props.history.push("/signupsuccess");
                    });
                } else {
                    document.querySelector('.animation').style.display = "none";
                    document.querySelector('.useralreadyexists').style.display = "flex";
                    this.setState({
                        error: true
                    })
                }

            })
        }else{
            document.querySelector('.passwordsnotmatch').style.display = "flex";
            document.querySelector('.animation').style.display = "none";
        }

    }

    render() {
        return (
            <div className="signuppage">
                <div className="signuppage-welcome-text">
                    <span>Welcome To Hyderabad Flavours</span>
                </div>
                <form className="signupform" onSubmit={this.signup.bind(this)}>
                    <div className="useralreadyexists"><p>User Already Exists</p></div>
                    <div className="passwordsnotmatch"><p>Passwords Don't match</p></div>
                    <div className="animation">
                        <div className="sk-chase">
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                        </div>
                    </div>
                    <div className="signup-input-field">
                        <TextField error={this.state.error} label="Full Name" value={this.state.fullname} onChange={this.handleNameChange.bind(this)} required></TextField>
                    </div>
                    <div className="signup-input-field">
                        <TextField error={this.state.error} label="User Id" value={this.state.userid} onChange={this.handleUserIdChange.bind(this)} required></TextField>
                    </div>
                    <div className="signup-input-field">
                        <TextField error={this.state.error} type="password" label="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} required></TextField>
                    </div>
                    <div className="signup-input-field">
                        <TextField error={this.state.error} type="password" label="Confirm Password" value={this.state.confirmpassword} onChange={this.handleConfirmPasswordChange.bind(this)} required></TextField>
                    </div>
                    <div className="signup-input-field">
                        <Button type="submit" variant="contained" color="primary" className="signupbtn">Sign Up</Button>
                    </div>
                </form>
            </div>

        )
    }
}
export default SignUp;