import React from 'react';
import './Register.css';

class Register extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			name: '',
			email: '',
			password: ''
		};
	}

	// store name
	onNameChange = (event) => {
		this.setState({
			name: event.target.value
		});
	}

	// store email
	onEmailChange = (event) => {
		this.setState({
			email: event.target.value
		});
	}

	// store password
	onPasswordChange = (event) => {
		this.setState({
			password: event.target.value
		});
	}

	// post user info to DB, and populate on profile
	onRegister = () => {

		fetch('http://localhost:2000/register', {

				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: this.state.name,
					email: this.state.email,
					password: this.state.password
				})
			})
			.then(response => response.json())
			.then(user => {
				console.log(user);
				if (user) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
			})
	}

	render() {

		return (
			<div>
				<section className="Register">	
					
					<p className="bar"></p>

					<fieldset>

						<legend>Name</legend>
						<input onChange={this.onNameChange} type="text" placeholder="name"/>  

					</fieldset>

						<fieldset> 

							<legend>Email</legend>
							<input onChange={this.onEmailChange} type="email" placeholder="email"/>

					</fieldset>

					<fieldset>

						<legend>Password</legend>
						<input onChange={this.onPasswordChange} type="password" placeholder="*******"/>
							
					</fieldset>

					<input className="sub" onClick={this.onRegister} type="submit" value="Submit"/>

				</section>
      </div>
		);
  }
}

export default Register;