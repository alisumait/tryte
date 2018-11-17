import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Webcam from "react-webcam";
import { Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import  Human  from './human.png';
import base64Img from 'base64-img';
import base_64 from 'base64-img';
import $ from "jquery";
import fs from "fs";
import '../App.css';
//var fs = require('browserify-fs');
var b64toBlob = require('b64-to-blob');


class WebcamCap extends Component {

    constructor(props){
        super(props);
        this.state = { 
            screenshot: null,
            process: false,
            styles: [],
            garments: [],
            gender: "",
            age: 0}
        // this can be moved directly to the onClick event
//        this.saveImage = this.saveImage.bind(this);
//        this.b64toBlob = this.b64toBlob.bind(this);
        this.input = this.input.bind(this);
        
    }
//    
//    b64toBlob(b64Data, contentType, sliceSize) {
//  contentType = contentType || '';
//  sliceSize = sliceSize || 512;
//
//  var byteCharacters = atob(b64Data);
//  var byteArrays = [];
//
//  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//    var slice = byteCharacters.slice(offset, offset + sliceSize);
//
//    var byteNumbers = new Array(slice.length);
//    for (var i = 0; i < slice.length; i++) {
//      byteNumbers[i] = slice.charCodeAt(i);
//    }
//
//    var byteArray = new Uint8Array(byteNumbers);
//
//    byteArrays.push(byteArray);
//  }
//
//  var blob = new Blob(byteArrays, {type: contentType});
//  return blob;
//}
//    
//     saveImage(base64string) {
//        var imageData = base64string.split(',')[1];
//         
//         var blob = this.b64toBlob(imageData, 'image/jpeg');
//         var blobUrl = URL.createObjectURL(blob);
//
//         
//        var a = $("<a>").attr("href", blobUrl)
//                        .attr("download","image.jpeg")
//                        .appendTo("body");
//
//            a[0].click();
//
//        a.remove();
//    }

    
     setRef = webcam => {
    this.webcam = webcam;
  }

    componentDidMount(){
                var that = this;

        setTimeout(
    function() {
      const imageSrc = this.webcam.getScreenshot();
        

        const video = this.webcam.stream.getVideoTracks()[0];
        
//        var blob = this.b64toBlob(imageSrc.split(',')[1], 'image/jpeg');

        var base = imageSrc.split(',')[1];

    let formData = new FormData();
        formData.append('image', base);
        
        
        fetch('http://localhost:5000/face', {
            method: "POST",
            body: formData
        }).then(e => e.json())
        .then(e=>{
            fetch('http://localhost:5000/fashion', {
            method: "POST",
            body: formData
        }).then(e => e.json())
        .then(d=>{
                let face = e.faces[0];
                let person = d.person;
                console.log(face);
                console.log(person);
            that.props.onData({
                age:face.age,
                gender:face.gender.value,
                garments:person.garments.map(a=>a.typeName),
                styles:person.styles.map(a=>a.styleName)
            })
             }
              );
            
          }
 );
        
        
        
        
              this.setState({process: true});
    $('body').children('img').last().remove();
      
console.log(this.state.gender);
      
      video.stop();
//        var file = this.saveImage(imageSrc);
        

        
      this.setState({screenshot: imageSrc});
    }
    .bind(this),
    4000
);
    }
 
input(e){
//    let file =e.target.files[0];
//    let formData = new FormData();
//        formData.append('filename', file);
//        formData.append('access_key', '866b74743f9ac85998d7');
//        formData.append('secret_key', '3754dd38511718413783b24c18b2c36669b47a8e');
//
//        fetch('localhost:5000', {
//            method: "POST",
//            body: formData
//        }).then(e => e.json())
//        .then(e=>console.log(e));
//              this.setState({process: true});
//    $('body').children('img').last().remove();
      }

  render() {
      
      
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
      
      if(this.state.process == true){
          return(
            <Redirect to="/processing"></Redirect>
              );
      }
      
      
      
    return (
        
      <div>
            <img className="human" src={Human}></img>


        <Webcam
          audio={false}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </div>
    )
      
    
      
  }
}

export default WebcamCap;