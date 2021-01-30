import React from 'react';
import { Component } from 'react';
import firebase from '../../services/firebase.js';
import MenuItem from '../menu-component/MenuItems.js'
import Header from '../header-component/Header.js'
import ContinueButton from '../menu-component/ContinueButton.js';
import Filter from '../menu-component/Filter.js';


class HomePage extends Component {

        state = { 
            menu: [],
            sortValue: "",
            filterValue: "",
            menutoDisplay: [],
            selectedItems: [],
            user: JSON.parse(localStorage.getItem("user"))
        };

    componentDidMount() {
        firebase.database().ref("Menu").on("value", dataSnap => {
            const itemsQuantityArray = [];
            const itemsArray = [];
            const menutoDisp = [];
            const menuItems = dataSnap.val();
            for (var key in menuItems) {
                if (menuItems.hasOwnProperty(key)) {
                  let itemgroup = menuItems[key];
                  itemgroup.forEach(item => {
                    itemsQuantityArray.push(0);
                    item.quantity = 0;
                    itemsArray.push(item);
                    menutoDisp.push(item);
                  })
                }
            }
            this.setState({
                menu: itemsArray,
                itemsQuantity: itemsQuantityArray,
                menutoDisplay: menutoDisp
            });
        })
    }

    increment(event) {
        event.persist();
        let itemName = event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.itemname p').innerHTML;
        let selectedItems = this.state.selectedItems;
        let menu = [];
        this.state.menutoDisplay.forEach(el => {
            if(el.name === itemName){
                if(selectedItems.indexOf(el)!== -1){
                    el.quantity = el.quantity + 1;
                }else{
                    el.quantity = 1;
                    selectedItems.push(el);
                }
            }
            menu.push(el);
        })
        this.setState({
            selectedItems: selectedItems,
            menutoDisplay: menu
        }
        )
    }

    decrement(event) {
        event.persist();
        let itemName = event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.itemname p').innerHTML;
        let selectedItems = this.state.selectedItems;
        let menu = [];
        this.state.menutoDisplay.forEach(el => {
            if(el.name === itemName){
                if(selectedItems.indexOf(el)!== -1 && el.quantity !== 1){
                    el.quantity = el.quantity > 1 ? el.quantity - 1 : el.quantity
                }else{
                    el.quantity = 0;
                    selectedItems = selectedItems.filter(function( obj ) {
                        return obj.name !== itemName;
                    });
                }
            }
            menu.push(el);
        })
        this.setState({
            selectedItems: selectedItems,
            menutoDisplay: menu
        }
        )
    }

    sortChange(event){
        const val = event.target.value;
        const menutoDisp = val === "Price" ? this.state.menu.sort((a,b) => a.price-b.price) 
                        : val === "Name" ?  this.state.menu.sort((a,b) => a.name.localeCompare(b.name)) 
                        : this.state.menu;
        this.setState({
            sortValue: val,
            filterValue: "",
            menutoDisplay: menutoDisp
        })
        console.log(event.target.value);

    }

    filterChange(event){
        const val = event.target.value;
        const menutoDisp = [];
        this.state.menu.forEach(el => {
            if(el.type===val){
                menutoDisp.push(el);
            }
        })
        this.setState({
            filterValue: val,
            menutoDisplay: menutoDisp
        })
        console.log(event.target.value)
    }

    setSelectedItems(){
        localStorage.setItem("selecteditems", JSON.stringify(this.state.selectedItems));
        this.props.history.push('/payment')
    }

    render() {
        return (
            <div className="homepage">
                <Header 
                props = {this.props}
                />
                <div className="info-div">
                    <p className="welcome-text-home">Hi, {this.state.user.name != null ? this.state.user.name : this.state.user.Name}</p>
                    <Filter
                    sortValue={this.state.sortValue}
                    filterValue={this.state.filterValue}
                    handleSortChange={this.sortChange.bind(this)}
                    handleFilterChange={this.filterChange.bind(this)}
                    />
                </div>
                <div className="itemscontainer">
                    <MenuItem 
                    items={this.state.menutoDisplay}
                    onIncrement={this.increment.bind(this)}
                    onDecrement={this.decrement.bind(this)}
                    />
                </div>
                <ContinueButton
                selectedItemsLength={this.state.selectedItems.length}
                onContinue={this.setSelectedItems.bind(this)}/>
            </div>
        )
    }
}
export default HomePage;