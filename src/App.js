import React, { Component } from 'react';
import { Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Fader from 'react-fader';
import Switch from 'react-router-transition-switch';
import Logo from './logo/logo.jsx';
import Pricer from './pricer/pricer.jsx';
import WebcamCap from "./webcam/webcam.jsx";
import Waiting from "./waiting/waiting.jsx";
import './App.css';

class App extends Component {
    
    constructor(props){
        super(props);
        
                this.handleData = this.handleData.bind(this);

    this.state = {
    value: 50,
        styles: [],
            garments: [],
            gender: "",
            age: 0
  };
}
    
    handleData(data){
                        console.log(data);

//        this.state = data;
        this.state.age = data.age;
        this.state.garments = data.garments;
        this.state.gender = data.gender;
        this.state.styles = data.styles;
            }
    
  render() {
     
      let value = this.state.value;
      
    return (
      
        <Router>
        <Switch component={Fader}>
        
       <Route exact strict path="/" render={
            ()=> {
            return(
                <div className="main">
                    <Logo></Logo> 
                    <Pricer></Pricer>
                    <Link to="/start"><input type="button" className="btn btn-primary" value="Start"></input></Link>
                    </div>
        )
            }
        } />

        <Route exact strict path="/start" render={
            ()=> {
            return(
                    
            <WebcamCap onData={this.handleData}/>
                    
        )
            }
        } />

<Route exact strict path="/processing" render={
            ()=> {
            return(
                    
            <Waiting></Waiting>
                    
        )
            }
        } />

<Route exact strict path="/items" render={
            ()=> {
            return(
                    
            <Items age={this.state.age} gender={this.state.gender} styles={this.state.styles} garments={this.state.garments} />
            )
        }} />

        

        </Switch>
        </Router>
        
    );
  }
}

export default App;
