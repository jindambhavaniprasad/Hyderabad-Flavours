import React from 'react'
import { Component } from 'react';
import { FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import firebase from '../../services/firebase.js'

class LoginWithOTP extends Component{

    state = {
        phoneNumber: "",
        otp: "",
        loginbutton: true,
        otpinput: true,
        recaptcha : null
    }

    handleSubmit(event){
        console.log(event.target);
        document.querySelector('.animation').style.display="block";
        event.preventDefault();
        let number = "+91"+this.state.phoneNumber;
        document.getElementById('recaptcha-container').innerHTML="";
        //let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');
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

    signIn(number,recaptcha){
        firebase.auth().signInWithPhoneNumber(number,recaptcha).then((e)=>{
            this.setState({
                confirmationResult : e,
                otpinput: false
            })
            document.querySelector('.otpsend-msg').style.display="block";
            document.querySelector('.otpsendbtn').setAttribute('disabled',true);
            document.querySelector('.animation').style.display="none";
            }).catch((error) => {
                console.log(error.message);
                alert(error.message);
            });
    }

    handlePhnNoChange(event){
        let val = event.target.value;
        const re = /^[0-9\b]+$/;
        if(val.length>10){
            val = val.trim().substring(0,10);
            event.target.value = val;
        }
        if((val === "" || re.test(val))){
            this.setState({
                phoneNumber: event.target.value
            })
        }
    }

    redirectToLogin(event){
        console.log(event.target);
        event.preventDefault();
        document.querySelector('.animation').style.display="block";
        this.state.confirmationResult.confirm(this.state.otp).then((e)=>{
            console.log(e.user);
            document.querySelector('.animation').style.display="none";
            this.props.history.push('/homepage');
        }).catch((error) => {
            console.log(error);
            alert("error");
        })
    }

    handleOTPChange(event){
        this.setState({
            otp: event.target.value
        }, () => {
            if(this.state.otp !== ""){
                this.setState({
                    loginbutton: false
                });
            }
        })
    }


    render(){
        return(
            <div className="loginwithotpform">
                <div className="welcome-text-otp"><p>Welcome to Hyderabad Flavours</p></div>
                <div className="animation">
                <div class="sk-chase">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    </div>
                </div>
                <div className="loginwithotpform-inner">
                <form onSubmit={this.handleSubmit.bind(this)} className="phnform">
                <FormControl>
                    <InputLabel htmlFor="my-input">Phone Number</InputLabel>
                    <Input id="phn-input" value={this.state.phoneNumber} onChange={this.handlePhnNoChange.bind(this)} maxLength="10" required/>
                    <FormHelperText id="my-helper-text">We'll never store your number.</FormHelperText>
                </FormControl>
                <button className="btn btn-link otpsendbtn" type="submit" disabled={false}>Send OTP</button>
                </form>
                <div id="recaptcha-container"></div>
                <div className="otpsend-msg" style={this.state.displaymsg}><p>An OTP has been sent to your mobile. Please enter below</p></div>
                <form onSubmit={this.redirectToLogin.bind(this)} className="otpform">
                    <FormControl>
                        <InputLabel htmlFor="my-input">OTP</InputLabel>
                        <Input id="otp-input" value={this.state.otp} onChange={this.handleOTPChange.bind(this)} disabled={this.state.otpinput} required/>
                    </FormControl>
                    <button className="btn btn-success loginwithotp-btn" type="submit" disabled={this.state.loginbutton}>Login</button>
                </form>
                </div>
            </div>
        )
    }
}
export default LoginWithOTP;