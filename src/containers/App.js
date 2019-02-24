import React, {Component} from 'react';
import Particles from 'react-particles-js'; //Particles.js react library
import Clarifai from 'clarifai'; //Clarifai computer vision oackage API
import '../App.css';
import '../ImageLinkForm.css';
import Navigation from '../components/Navigation/Navigation.js';
import Register from '../components/Register/Register.js';
import SignIn from '../components/SignIn/SignIn.js';
import Logo from '../components/Logo/Logo.js';
import Rank from '../components/Rank/Rank.js';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js';

//initialization for clarifai image recognition API
const app = new Clarifai.App({
  apiKey: 'dec331faeab64cc8aa7271c8cdd3fbea'
 });

//object configuration for particles.js
const particleOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    },
    size: {
      value: 27.6,
      random: true
    }
  }
};

// states kept outside so this variable can be called when a state reset is needed.
const initialState = {
  
  //url from input field
  input: '',
  //img url
  imageUrl: '',
  //bounding box percentages
  box: {},
  //page routing
  route: 'signin',
  //sigin in state
  isSignedIn: false,
  //user profile info
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: new Date()
  }

};

class App extends Component {
  constructor() {

    super();

    this.state = initialState;
  }

  //load user profile after registration
  loadUser = (data) => {

    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  //calculation for dimensions of where border goes around face
  calculateFaceLocation = (data) => {

    //percentages of the image size where face is located 
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {

      //face location percentages multiplied by the corresponding length or height equals where the border begins
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      //subract width for reverse direction
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  //populates box state object with dimensions for face detection
  displayFaceDetectionBox = (box) => {

    this.setState({box: box}); 
  }

  onInputChange = (event) => {

    this.setState({input: event.target.value});
    console.log(event.target.value);
  }

  //image sumbmition
  onSubmit = () => {
    /**
    @NOTE set state method in react is asynchronous.Multiple calls are batched into set state, rerenders the component once using the diffing algorithm.The setstate method should be called on the 'exact' state being changed.
    */
    this.setState({imageUrl: this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then((response) => {

      if(response) {

        fetch('http://localhost:2000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          }) 
        })
        .then(response => response.json())
        .then(count => {
         
          this.setState(Object.assign(this.state.user.entries, {
            entries: count
          }));
        })
        .catch(console.log);
      }
        //use this since we're in a class
        this.displayFaceDetectionBox(this.calculateFaceLocation(response));
        console.log(response);
      }
    )
    .catch((err) => {

      console.log(`ERROR: ${err}`);
    });
  }

  //page routing
  onRouteChange = (route) => {

    if(route === 'signout') {

      this.setState(initialState);
    }
    else if(route === 'home') {

      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {

    const { isSignedIn, imageUrl, route ,box } = this.state;
    return (
        <div className='App'>
          <Particles className="particles" params={particleOptions}/>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          
          {route === 'home'
            ? <div>
                <Logo/>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit}/>
                <FaceRecognition box={box} imageUrl={imageUrl}/>
              </div>
            
            : (
                route === 'signin' 
                ? <div>
                    <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  </div> 

                : <div>
                    <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  </div>
              )
          }
        </div>
    );
  }
}

export default App;
