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
        doesPasswordsMatch: true,
        phoneNumber: "",
        otp: "",
        signupbutton: true,
        confirmationResult: null,
        phoneNoError: false
    }

    hideAll = () => {
        document.querySelector('.signup-otpsend-msg').style.display="none";
        document.querySelector('.animation').style.display="none";
        document.querySelector('.passwordsnotmatch').style.display = "none";
        document.querySelector('.incorrectOTP').style.display="none";
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

    handlePhoneNumberChange(event){
        let val = event.target.value;
        const re = /^[0-9\b]+$/;
        if(val.length>10){
            val = val.trim().substring(0,10);
            event.target.value = val;
        }
        if((val === "" || re.test(val))){
            this.setState({
                phoneNumber: event.target.value,
                phoneNoError: false
            })
        }
    }

    handleOTPChange(event){
        this.setState({
            otp: event.target.value
        }, () => {
            if(this.state.otp !== ""){
                this.setState({
                    signupbutton: false
                });
            }
        })
    }

    sendOTP(event){
        console.log(event.target);
        this.hideAll();
        if(this.state.phoneNumber !== ""){
            document.querySelector('.animation').style.display="block";
            event.preventDefault();
            let number = "+91"+this.state.phoneNumber;
            document.getElementById('recaptcha-container').innerHTML="";
            let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                console.log(response);
                this.setState({
                    recaptcha: recaptcha
                })
                }
            });
            this.signIn(number,recaptcha);
        }
        else{
            document.querySelector('.signup-sendotpbtn').setAttribute('disabled',false);
            this.setState({
                phoneNoError: true
            })
        }
        
    }

    signIn(number,recaptcha){
        firebase.auth().signInWithPhoneNumber(number,recaptcha).then((e)=>{
            this.setState({
                confirmationResult : e,
                otpinput: false
            })
            document.querySelector('.signup-otpsend-msg').style.display="block";
            document.querySelector('.signup-sendotpbtn').setAttribute('disabled',true);
            document.querySelector('.animation').style.display="none";
            }).catch((error) => {
                console.log(error.message);
                alert(error.message);
            });
    }

    signup(event) {
        event.preventDefault();
        console.log(event.target);
        this.hideAll();
        let exists = false;
        let user = [];
        user.Name = this.state.fullname;
        user.userid = this.state.userid;
        user.password = this.state.password;
        user.phoneNumber = this.state.phoneNumber;
        user.acctype = "user";
        console.log(user);
        document.querySelector('.animation').style.display="block";
        if (this.state.doesPasswordsMatch) {
            this.state.confirmationResult.confirm(this.state.otp).then((e)=>{
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
                        this.setState({
                            error: true
                        })
                    }
    
                })
            }).catch((error) => {
                console.log(error);
                document.querySelector('.incorrectOTP').style.display="block";
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
                    <div className="incorrectOTP"><p>Incorrect OTP. Try Again</p></div>
                    <div className="signup-otpsend-msg"><p>An OTP has been sent to your mobile. Please enter below</p></div>
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
                    <div className="signup-otp">
                    <div id="recaptcha-container"></div>
                        <div className="signup-phonenumber">
                            <TextField error={this.state.phoneNoError} type="text" label="Phone Number" className="phonenumber-field" value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange.bind(this)} required/>
                            <Button variant="contained" color="secondary" className="signup-sendotpbtn" onClick={this.sendOTP.bind(this)}>Send OTP</Button>
                        </div>
                        <div className="signup-otpfield">
                            <TextField type="password" label="OTP" value={this.state.otp} onChange={this.handleOTPChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="signup-input-field">
                        <Button type="submit" variant="contained" color="primary" disabled={this.state.signupbutton} className="signupbtn">Sign Up</Button>
                    </div>
                </form>
            </div>

        )
    }
}
export default SignUp;