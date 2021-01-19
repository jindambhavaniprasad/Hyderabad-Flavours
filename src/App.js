import React from 'react';
import './App.css';
import './Component/home-component/home';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "../src/Component/itemscomponent/items";
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Component } from 'react';
import Home from './Component/home-component/home';
import Items from '../src/Component/itemscomponent/items';


class App extends Component{

  render(){
    return(
      <BrowserRouter>
        <Route exact path="/">
          {true ? <Redirect to = "/login"/> : ""}
        </Route>
        <Route path = "/login" component = {Home}></Route>
        <Route path = "/viewusers" component = {Items}>
        </Route>
      </BrowserRouter>
    )
  }
}

export default App;
