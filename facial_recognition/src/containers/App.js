import React, {Component} from 'react';
import Particles from 'react-particles-js'; //Particles.js react library
import '../App.css';
import '../ImageLinkForm.css';
import Navigation from '../components/Navigation/Navigation.js';
import Register from '../components/Register/Register.js';
import SignIn from '../components/SignIn/SignIn.js';
import Logo from '../components/Logo/Logo.js';
import Rank from '../components/Rank/Rank.js';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js';

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

//the states are kept outside so that this variable can be called when a state reset is needed.
const initialState = {
  
  //holds urll from input field
  input: '',
  //img url gets passed down to imageUrl
  imageUrl: '',
  //object holding the bounding box percentages
  box: {},
  //keeps track of where we are on the page
  route: 'signin',
  //check sigin in state
  isSignedIn: false,
  //user profile information
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: new Date()
  }

};

//NOTE: components that hold states are smart components 
class App extends Component {
  //constructor of smart component used to define state
  constructor() {
    //always call super to be able to use this
    //makes call to the component constructor
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
    //percentages of the image size where the face is located 
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      //face location percentages multiplied by the corresponding length or height equals where the border will begin
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      //subract width to go negative in other direction
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  //populates box state object with dimensions for face detection
  displayFaceDetectionBox = (box) => {
    console.log(box);
    this.setState({box: box}); 
  }

  //NOTE: non native methods must be definfed as function expressions
  //event listener for input change
  onInputChange = (event) => {
    //target is the element where the event is occuring
    this.setState({input: event.target.value});
    console.log(event.target.value);
  }

  //runs on image sumbmition
  onSubmit = () => {
    //set state method in react is asynchronous. Multiple calls are batched into set state, then rerenders the component once using the diffing algorithm. The setstate method should be called on the exact state being changed, other wise the async call won't be finished with its process before executing.
    this.setState({imageUrl: this.state.input});

    //imageUrl input is a post request to process new image
    fetch('http://localhost:2000/imageUrl', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then((response) => {
      //if an image is recieved
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
          //for something like this, we don't want to change entire user object to change. Just update it
          this.setState(Object.assign(this.state.user, {
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

  //changes routes(web pages)
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
    //use destructuring to avoid using this.state so many times
    const { isSignedIn, imageUrl, route ,box } = this.state;
    return (
        <div className='App'>
          <Particles className="particles" params={particleOptions}/>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          {/*curly brackets wihtin JSX signify a space being created to write JS*/}
          {/*if the route state is signin only show th sign in component. else show the rest of the components*/}
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

//came native to API predict field
// Clarifai.GENERAL_MODEL, {base64: "G7p3m95uAl..."}  
// "dec331faeab64cc8aa7271c8cdd3fbea", "https://samples.clarifai.com/face-det.jpeg"