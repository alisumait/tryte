import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'rc-slider/assets/index.css';
import './pricer.css';
const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
const utterance = new SpeechSynthesisUtterance();


class Pricer extends Component {

    constructor(props) {
        super(props);

        this.rangeChange = this.rangeChange.bind(this)
        this.updateRange = this.updateRange.bind(this)
        this.sendData = this.sendData.bind(this)
        this.state = {
            vals: [80, 100]
        }


    }



    updateRange(from, to) {
        console.log("dahfkhsaklfkljfdsahgas")
        let res = [from, to];
        this.setState({
            vals: res
        })
        this.sendData(res)

        console.log(this.state.vals)
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

    handleSpeech(r) {
        let matches = r.match(/(\d+)/g);

        if (matches == null || matches.length < 2)
            return this.startConversation('sorry, can you say that again');

        this.updateRange(matches[0], matches[1]);
        setTimeout(this.props.onPricerDone, 500)
    }

    sendData(value){
        this.props.onData(value)
    }
    // sendData(){
    //     this.props.onData(this.state.vals)
    // }

    componentWillMount() {
        recognition.addEventListener('result', (e) => {
            let last = e.results.length - 1;
            let lastResult = e.results[last][0]
            let text = lastResult.transcript;
            let confidency = lastResult.confidence;

            // console.log('confidence: ' + confidency);
            // console.log(text);

            this.handleSpeech(text);
        })

        recognition.addEventListener('speechend', () => {
            recognition.stop();
        })

        recognition.addEventListener('error', (e) => {
            console.log(e)
        });
    }

    componentDidMount() {
        setTimeout(() => this.startConversation('please state your budget'), 2000)
    }

    rangeChange(value){
        this.setState({
            vals: value
        })
        this.sendData(value)     
    }

    render() {
        const railstyles = {
            backgroundColor: 'black',
            height: '10px'
        }

        return (

            <div className="pricer">
                <Range
                    className="range"
                    defaultValue={this.state.vals}
                    value={this.state.vals}
                    onChange={this.rangeChange}
                    min={20}
                    max={600}
                    railStyle={railstyles}
                    tipProps={{ visible: true }}
                />
            </div>

        )
    }

}


export default Pricer;