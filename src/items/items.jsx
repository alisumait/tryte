import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'rc-slider/assets/index.css';
import $ from "jquery";
import './items.css';

class Items extends Component {

    constructor(props){
        super(props);
        
        var arr;
        
        this.state = {
            age: this.props.age,
            gender: this.props.gender,
            styles: this.props.styles,
            garments: this.props.garments
        }
    }
    
    componentDidMount(){
        var that = this;
        
        $.getJSON('data.json', function(data){
        let age = that.props.age;
        let price = that.props.price;
            
        if(that.props.gender.toLowerCase().includes('f')){
            let female_list = data.clothes[1].female;
            let filteredF = female_list.filter(a=>
                age >= a.minage && age <= a.maxage
            );
            
        }else{
            let male_list = data.clothes[0].male;
            let filteredM = male_list.filter(a=>
                age >= a.minage && age <= a.maxage
            );
            console.log(filteredM);
        }
            
        })
        
        
    }
    
    render() {
        
        
        
            return (
            
                <h1></h1>
                
            )
    }

}

export default Items;