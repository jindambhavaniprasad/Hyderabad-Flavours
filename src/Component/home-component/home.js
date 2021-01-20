import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

class Home extends Component {

  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
    this.state = {
      userName: "",
      password: "",
      enabled: false
    }
  }

  handleChange(event) {
    console.log(event.target.id);
    if (event.target.id === 'login-username') {
      this.setState({
        userName: event.target.value,
        password: this.state.password
      })
    }
    if (event.target.id === 'login-password') {
      this.setState({
        userName: this.state.userName,
        password: event.target.value
      })
    }
  }

  submitLogin(event) {
    if (this.state.userName === "Bhanu" && this.state.password === "9100623783") {
      this.props.history.push("/viewusers");
    } else {
      document.querySelector('.not-owner').style.display = "block";
      event.preventDefault();
    }
  }

  responseGoogleOnSuccess = (response) => {
    console.log(response.profileObj.name);
    this.props.history.push("/viewusers");
  }

  responseGoogleOnFailure = (response) => {
    console.log(response);
  }

  render() {
    return (
      <form className="home-form" onSubmit={this.submitLogin.bind(this)}>
        <div className="login-form-div">
          <span className="welcome-text">Welcome To Hyderabad Flavours</span>
          <img src="https://www.freepnglogos.com/uploads/chef-png/chef-sitar-knoxville-authentic-indian-restaurant-29.png" className="chef-image" alt="" />
          <div className="login-form">
            <div className="userName login-field">
              <input type="text" className="form-control" id="login-username" placeholder="User Name" value={this.state.userName} onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="password login-field">
              <input type="password" className="form-control" id="login-password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)} required />
            </div>
            <div className="loginBtn login-field">
              <button id="login-btn" className="btn btn-primary" type="submit">Login</button>
            </div>
            <div className="continueBtn login-field">
              <Link to="./viewusers" className="btn btn-primary"><span className="continue-text">Guest Login</span></Link>
              <GoogleLogin
                className="googleLoginBtn"
                clientId="1077394997428-4gpt4htaqakich7dul7jfitkk70i0rug.apps.googleusercontent.com"
                buttonText=""
                onSuccess={this.responseGoogleOnSuccess}
                onFailure={this.responseGoogleOnFailure}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </div>
          <span className="not-owner">You are not the owner so you cannot Login. Try Again</span>
        </div>
      </form>
    );
  }
}

export default Home;