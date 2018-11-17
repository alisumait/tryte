import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'rc-slider/assets/index.css';
import { Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Waiter from './waiting.gif'
import './waiting.css'


class Waiting extends Component {

    constructor(props){
        super(props);
        this.state={
            end: false,
        }
        
    }
    
    
    componentDidMount(){
        var that = this;
        setTimeout(function(){
            that.setState({end: true});
        },3000)
        
    }
    render() {
        
        if(this.state.end){
            return(
            <Redirect to="/items"></Redirect>
            )
        }
        
            return (
            <div>
                <img className="wait" src={Waiter}></img>
                    <span>In the works...</span>
            </div>
            )
    }

}

export default Waiting;