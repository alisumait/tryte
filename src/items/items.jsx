import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'rc-slider/assets/index.css';
import Clothes from "../clothes/clothes.jsx";
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

    componentDidMount() {
        var that = this;

        $.getJSON('data.json', function (data) {
            console.log('test', that.props)
                let age = that.props.age;
                let minprice = that.props.minPrice;
                let maxprice = that.props.maxPrice;
    
                let gender_list;
    
                if (that.props.gender.toLowerCase().includes('f')) {
                    gender_list = data.clothes[1].female;
                } else {
                    gender_list = data.clothes[0].male;
                }
                let tmp_filtered = gender_list.filter(a =>{
                    console.log('fff', a, a.minage, a.maxage, age)
                    return age >= a.minage && age <= a.maxage
                })

                tmp_filtered = tmp_filtered.filter(a => {
                    return a.price >= minprice && a.price <= maxprice
                });

                console.log(gender_list);
                console.log(tmp_filtered);
    
                that.setState({
                    filtered: tmp_filtered.map((value, index) => {
                        return {
                            id: index,
                            url: value.url,
                            name: value.name,
                            price: value.price
                        }
                    })
                });
            }, 500);
    }

    render() {

        return (

            
                this.state.filtered.map((a,index)=>{
             return(
             <Clothes name={a.name}
                 price={a.price}
                 url={a.url}/>
             )
            })
    

        )
    }

}

export default Items;