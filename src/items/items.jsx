import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'rc-slider/assets/index.css';
import './pricer.css';
const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class Pricer extends Component {

    
    render() {
        const railstyles={
            backgroundColor:'black',
            height:'10px'
        }
        
            return (
            
                <div className="pricer">
                <Range
                    className="range"
                defaultValue={[120, 250]}
                    min={20}
                    max={600}
                    railStyle={railstyles}
                    tipProps={{visible:true}}
                    />
                </div>
                
            )
    }

}

export default Pricer;