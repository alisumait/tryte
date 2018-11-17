import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'rc-slider/assets/index.css';
import $ from "jquery";
import './items.css';

class Items extends Component {

    constructor(props) {
        super(props);
        
        var arr;
        
        this.state = {
            age: this.props.age,
            gender: this.props.gender,
            styles: this.props.styles,
            garments: this.props.garments,
            filtered: []
        }
    }
    
    filterByAge(arr, age) {
        return arr.filter(a =>
            age >= a.minage && age <= a.maxage
        );
    }

    componentDidMount() {
        var that = this;
        
        $.getJSON('data.json', function (data) {
        let age = that.props.age;
        let price = that.props.price;
            
            let gender_list;
            
            if (that.props.gender.toLowerCase().includes('f')) {
                gender_list = data.clothes[1].female;
            } else {
                gender_list = data.clothes[0].male;
        }
            let tmp_filtered = this.filterByAge(gender_list, age);
            
            this.setState({
                filtered: tmp_filtered.map((value, index) => {
                    return {
                        id: index,
                        url: value.url,
                        name: value.name,
                        price: value.price
                    }
                })
            });
        })
        
        
    }
    
    render() {
        
        
        
            return (
            
                <h1>fdc</h1>
                
            )
    }

}

export default Items;