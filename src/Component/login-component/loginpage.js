import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import firebase from '../../services/firebase.js';
import { TextField } from '@material-ui/core';
import '../../Assets//clipart2473495.png';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
    this.state = {
      userName: "",
      password: "",
      enabled: false,
      error: false
    }
  }

  handleChange(event) {
    console.log(event.target.id);
    if (event.target.id === 'login-username') {
      this.setState({
        userName: event.target.value,
        password: this.state.password,
        error: false
      })
    }
    if (event.target.id === 'login-password') {
      this.setState({
        userName: this.state.userName,
        password: event.target.value,
        error: false
      })
    }
  }

  submitLogin(event) {
    event.preventDefault();
    document.querySelector('.animation').style.display = "flex";
    let verified = false;
    firebase.database().ref('Users').on("value", datasnap => {
      const users = datasnap.val();
      for (var key in users) {
        if (users.hasOwnProperty(key)) {
          let user = users[key];
          if (user.userId === this.state.userName && user.password === this.state.password) {
            localStorage.setItem("userkey",key);
            localStorage.setItem("user", JSON.stringify(user));
            verified = true;
          }
        }
      }
      if (!verified) {
        document.querySelector('.incorrectdetails').style.display = "flex";
        document.querySelector('.animation').style.display = "none";
        this.setState({
          error: true
        })
      } else {
        document.querySelector('.animation').style.display = "none";
        this.props.history.push("/homepage");
      }
    })
  }

  responseGoogleOnSuccess = (response) => {
    console.log(response.profileObj.name);
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    this.props.history.push("/homepage");
  }

  responseGoogleOnFailure = (response) => {
    console.log(response);
  }

  render() {
    return (
      <form className="home-form" onSubmit={this.submitLogin.bind(this)}>
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
        <div className="login-form-div">
          <div className="homepage-textarea">
            <div className="welcome-text">
              <span>Sri Hyderabad Flavours</span>
            </div>
          </div>
          <div>
            <div className="login-form">
            <div className="incorrectdetails">
              <span>Incorrect username or password</span>
            </div>
              <div className="userName login-field">
                <TextField error={this.state.error} type="text" label="User Name" variant="filled" id="login-username" value={this.state.userName} onChange={this.handleChange.bind(this)} required />
              </div>
              <div className="password login-field">
                <TextField error={this.state.error} type="password" label="Password" variant="filled" id="login-password" value={this.state.password} onChange={this.handleChange.bind(this)} required />
              </div>
              <div className="loginBtn login-field">
                <button id="login-btn" className="btn btn-primary" type="submit">Login</button>
              </div>
              <div className="continueBtn">
                <Link to="./loginwithotp" className="btn btn-primary"><span className="continue-text">OTP Login</span></Link>
                <GoogleLogin
                  className="googleLoginBtn"
                  clientId="1077394997428-4gpt4htaqakich7dul7jfitkk70i0rug.apps.googleusercontent.com"
                  buttonText=""
                  onSuccess={this.responseGoogleOnSuccess}
                  onFailure={this.responseGoogleOnFailure}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
              <div className="signup-link">
              <Link to='./signup' className="btn btn-link">Not a User? Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default LoginPage;