import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Component } from 'react';

class Filter extends Component{
    render(){
        const {
            sortValue, filterValue, handleSortChange, handleFilterChange
        }=this.props
        return(
            <div className="drop-down-div">
                <FormControl className="item-dropdown">
                <InputLabel>Sort</InputLabel>
                    <Select value={sortValue}  onChange={handleSortChange} placeholder="sort by">
                        <MenuItem value="Price">Price</MenuItem >
                        <MenuItem value="Name">Name</MenuItem >
                    </Select>
                </FormControl>
                <FormControl className="item-dropdown">
                <InputLabel>Filter</InputLabel>
                    <Select value={filterValue} onChange={handleFilterChange}>
                        <MenuItem value="Veg">Veg</MenuItem >
                        <MenuItem value="Non Veg">Non Veg</MenuItem >
                    </Select>
                </FormControl>
            </div>
        )
    }
}
export default Filter;