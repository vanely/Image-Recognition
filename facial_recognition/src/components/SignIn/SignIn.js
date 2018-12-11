import React from 'react';

class SignIn extends React.Component {
    
    constructor(props) {
        super(props);
        
        //storing onEmailChange, and onPasswordChange
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    
    //takes user email input
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }
    
    //takes user password input
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    // submits user data
    onSubmitSignIn = () => {

        // const {onRouteChange} = this.props;

        //to send info to backend we have to JSON.stringify() it
        //sending signin data to backend, with post request scheme
        //fetch by default makes a get request
        fetch('http://localhost:2000/signin', {

            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })   
        }
        
    render() {
        
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <section className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                            <div className="center">
                            {/*we only want onRouteChange to run onClick, so we need to make it an arrow function*/}
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSubmitSignIn}/>
                            </div>
                    </section>
                </main>
            </article>
        );
    }
}

export default SignIn;