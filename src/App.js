import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';
import { Component } from 'react';

const app = new Clarifai.App({ //similar setup for most apis. have to import above. 
  apiKey: '5b059aaf921941acbe57a3360e124249' 
 });



const particlesOptions = {
  particles : {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
    
  }
}






class App extends Component { //to change state
  constructor() {
    super();
    this.state = {
      input: '', //called what ever but blank.
      imageUrl: '',
      box: {}, //because its an object blank object. 
    }
  }

  calculateFaceLocation = (data) => { //want to call this function on the inputs from Clarifai.
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width); //create variable which gives width of image. wrapped in number to make sure it is a number. 
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
      }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => { //any time there is an event listener we receiver an event
    this.setState({input: event.target.value});// 
  }

  onButtonSubmit = () => { // when onButtonSubmit is run, passes to imagelink fore/ copy and paste code below looks like work as a sample appears. 
    this.setState({imageUrl: this.state.input}) //can pass the imageurl down to the facerecognition
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response))) //once we get the display response run the innter funcation calculateFL then run displayFB
    .catch(err => console.log(err));
  
  }
  

  render() {
  return (
    <div className="App">
        <Particles className='particles'
        params={particlesOptions} />
      
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} /> {/*passes onInputchange as a prop*/}
        
        
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl }/> {/*can now use imagurl in the facerecognition.js file*/}

    </div>
  );
}
}

export default App;
