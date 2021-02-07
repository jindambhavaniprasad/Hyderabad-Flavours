import { Button, TextField } from '@material-ui/core';
import React from 'react'
import { Component } from 'react';
import Header from '../header-component/Header';
import firebase from '../../services/firebase.js';

class Profile extends Component {

    state = {
        name: JSON.parse(localStorage.getItem("user")).Name,
        userid: JSON.parse(localStorage.getItem("user")).userId,
        password: JSON.parse(localStorage.getItem("user")).password,
        phoneNumber: JSON.parse(localStorage.getItem("user")).phoneNumber,
        button: true,
        userkey: localStorage.getItem("userkey")
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value,
            button: false
        })
    }

    handlePhoneNumberChange(event) {
        this.setState({
            phoneNumber: event.target.value,
            button: false
        })
    }

    handleuserIdChange(event) {
        this.setState({
            userid: event.target.value,
            button: false
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value,
            button: false
        })
    }

    updateProfile(event) {
        event.preventDefault();
        document.querySelector('.animation').style.display = "none";
        let editedUser = [];
        editedUser.Name = this.state.name;
        editedUser.password = this.state.password;
        editedUser.phoneNumber = this.state.phoneNumber;
        editedUser.userId = this.state.userid;
        editedUser.acctype = "user";
        console.log(editedUser);
        firebase.database().ref('Users').child(this.state.userkey).set(editedUser).then(() => {
            document.querySelector('.animation').style.display = "none";
            this.props.history.push('/homepage');
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <Header props={this.props} />
                <div className="profile-section">
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
                    <form onSubmit={this.updateProfile.bind(this)} className="profile-form">
                        <TextField className="profile-text-field" label="Name" variant="outlined" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
                        <TextField className="profile-text-field" label="Phone Number" variant="outlined" value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange.bind(this)} />
                        <TextField className="profile-text-field" label="User Id" variant="outlined" value={this.state.userid} onChange={this.handleuserIdChange.bind(this)} />
                        <TextField className="profile-text-field" label="Password" type="password" variant="outlined" value={this.state.password} onChange={this.handlePhoneNumberChange.bind(this)} />
                        <Button type="submit" className="profile-submit-btn" color="primary" disabled={this.state.button}>Update</Button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Profile;