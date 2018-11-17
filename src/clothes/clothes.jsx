import React, { Component } from 'react';
import './clothes.css';


class Clothes extends Component {
    
    
    render() {
            return (
            
                <div className="img-wrapper">
                <img className="clothes" src={this.props.url}></img>
                    <div className="words">
                        <h1>{this.props.name}</h1>
                        <h4><p>RM</p>{this.props.price}</h4>
                    </div>
                </div>
                
            )
    }


}

export default Clothes;