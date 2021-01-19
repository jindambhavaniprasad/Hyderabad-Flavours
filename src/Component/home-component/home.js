import React from 'react';
import { Component } from 'react';

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

  submitLogin(event){
    if(this.state.userName === "Bhanu" && this.state.password ==="9100623783"){
      this.props.history.push("/viewusers");
    }else{
      document.querySelector('.not-owner').style.display="block";
      event.preventDefault();
    }
  }

  render() {
    return (
      <form className="login-form-div" onSubmit={this.submitLogin.bind(this)}>
        <span className="welcome-text">Welcome To Hyderabad Flavours</span>
        <img src="https://www.freepnglogos.com/uploads/chef-png/chef-sitar-knoxville-authentic-indian-restaurant-29.png" className="chef-image" alt=""/>
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
        </div>
        <span className="not-owner">You are not the owner so you cannot Login. Try Again</span>
      </form>
    );
  }
}

export default Home;