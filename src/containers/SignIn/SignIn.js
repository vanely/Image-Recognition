import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  // store email
  onEmailChange = (event) => {
    this.setState({
      signInEmail: event.target.value
    });
  }

  //store password
  onPasswordChange = (event) => {
    this.setState({
      signInPassword: event.target.value
    });
  }

  // post user signin info for authentication
  onSubmitSignIn = () => {

    fetch('http://localhost:2000/signin', {

        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
  }

  render() {

    return (
      <div className="Signin">

        <p className="bar"></p>
        <fieldset> 

            <legend>Email</legend>
            <input onChange={this.onEmailChange} type="email" placeholder="email"/>

        </fieldset>

        <fieldset>

            <legend>Password</legend>
            <input onChange={this.onPasswordChange} type="password" placeholder="password"/>

        </fieldset>

        <input className="sub" onClick={this.onSubmitSignIn} type="submit" value="Submit"/>

      </div>
    );
  }
}

export default SignIn;