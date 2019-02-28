import React from 'react';
import './Navigation.css';

const Navigation = ({name, onRouteChange, isSignedIn }) => {
    if(isSignedIn) {
      return (
        <div className="Navigation-container">
          <nav className = "Navigation-signout">
            <p className="user">Hello, <span className="name">{name}</span></p>
            <p className="selection" onClick={() => onRouteChange('signout')}>Sign Out</p>
          </nav>
        </div>
      );
    } 
    else {
      return (
        <div className="Navigation-container">
            <nav className="Navigation-nav">
              <p className="selection signin"
              onClick = {
                () => onRouteChange('signin')
              }> Sign In </p>
              <p className="selection register"
              onClick={
                () => onRouteChange('register')
              }> Register </p>
            </nav>
        </div>
      );
    }
}

export default Navigation;
