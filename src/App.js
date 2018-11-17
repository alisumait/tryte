import React, { Component } from 'react';
import { Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Fader from 'react-fader';
import Switch from 'react-router-transition-switch';
import Logo from './logo/logo.jsx';
import Pricer from './pricer/pricer.jsx';
import WebcamCap from "./webcam/webcam.jsx";
import Waiting from "./waiting/waiting.jsx";
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
const utterance = new SpeechSynthesisUtterance();

class App extends Component {
    constructor(props) {

        super(props);

        this.PricerDone = this.PricerDone.bind(this);
        this.handleData = this.handleData.bind(this);

        this.state = {
            value: 50,
            styles: [],
            garments: [],
            gender: "",
            age: 0
        };
    }

    handleData(data) {
        console.log(data);

        //        this.state = data;
        this.state.age = data.age;
        this.state.garments = data.garments;
        this.state.gender = data.gender;
        this.state.styles = data.styles;
    }

    speak(text) {
        const synth = window.speechSynthesis;
        utterance.text = text;
        synth.speak(utterance);
    }

    startConversation(sentence) {
        this.speak(sentence);
        setTimeout(() => recognition.start(), 1000);
    }

    PricerDone() {
        this.startConversation('Now, shall we start?');
    }

    handleSpeech(r) {
        if (r.toLowerCase().includes('y')) {
            console.log('djdfhjsfdjkfaskk   ')
            this.setState({
                start: true
            });
        } else {
            this.startConversation('Why not, we gotta go. Do you want to start?');
        }

    }

    componentWillMount() {
        recognition.addEventListener('result', (e) => {
            let last = e.results.length - 1;
            let lastResult = e.results[last][0]
            let text = lastResult.transcript;

            this.handleSpeech(text);
        })

        recognition.addEventListener('speechend', () => {
            recognition.stop();
        })

        recognition.addEventListener('error', (e) => {
            console.log(e)
        });
    }

    render() {

        let value = this.state.value;


        return (

            <Router>
                <Switch component={Fader}>

                    <Route exact strict path="/" render={
                        () => {
                            if (this.state.start) {
                                return (
                                    <Redirect to="/start"></Redirect>
                                )
                            }
                            return (
                                <div className="main">
                                    <Logo></Logo>
                                    <Pricer onPricerDone={this.PricerDone} />
                                    <Link to="/start"><input id="link-btn" type="button" className="btn btn-primary" value="Start"></input></Link>
                                </div>
                            )
                        }
                    } />

                    <Route exact strict path="/start" render={
                        () => {
                            return (

                                <WebcamCap />

                            )
                        }
                    } />

                    <Route exact strict path="/processing" render={
                        () => {
                            return (

                                <Waiting></Waiting>

                            )
                        }
                    } />

                    <Route exact strict path="/items" render={
                        () => {
                            return (

                                <Items age={this.state.age} gender={this.state.gender} styles={this.state.styles} garments={this.state.garments} />
                            )
                        }} />



                </Switch>
            </Router>

        );
    }
}

export default App;
