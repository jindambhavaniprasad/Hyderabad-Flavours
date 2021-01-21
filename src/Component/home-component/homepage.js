import React from 'react';
import { Component } from 'react';
import firebase from '../../services/firebase.js';
import MenuItem from '../menu-component/MenuItems.js'
import Header from '../header-component/Header.js'
import ContinueButton from '../menu-component/ContinueButton.js';


class HomePage extends Component {

    constructor(props){
        super(props);
        this.state = { 
            menu: null,
            totalPrice: 0
        };
    }

    componentDidMount() {
        firebase.database().ref("Menu").on("value", dataSnap => {
            this.setState({
                menu: dataSnap.val()
            });
        })
    }

    render() {
        return (
            <div className="homepage">
                <Header 
                props = {this.props}
                />
                <div className="itemscontainer">
                    <MenuItem 
                    items={this.state.menu}
                    />
                </div>
                <ContinueButton/>
            </div>
        )
    }
}
export default HomePage;