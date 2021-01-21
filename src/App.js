import React from 'react';
import './App.css';
import './Component/login-component/loginpage';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "./Component/home-component/homepage";
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Component } from 'react';
import LoginPage from './Component/login-component/loginpage';
import HomePage from './Component/home-component/homepage';
import './Component/menu-component/MenuItems.css'
import './Component/header-component/Header.css'

class App extends Component{

  render(){
    return(
      <BrowserRouter>
        <Route exact path="/">
          {true ? <Redirect to = "/login"/> : ""}
        </Route>
        <Route path = "/login" component = {LoginPage}></Route>
        <Route path = "/homepage" component = {HomePage}>
        </Route>
      </BrowserRouter>
    )
  }
}

export default App;
