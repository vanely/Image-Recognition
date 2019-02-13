import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if(isSignedIn) {
      return (
        <div>
          <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signout')} className="nav f3 link dim underline pa3 pointer">Sign Out</p>
          </nav>
        </div>
      );
    } 
    else {
      return (
        <div>
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
              <p onClick={() => onRouteChange('signin')} className="nav f3 link dim underline pa3 pointer">Sign In</p>
              <p onClick={() => onRouteChange('register')} className="nav f3 link dim underline pa3 pointer">Register</p>
            </nav>
        </div>
      );
    }
}

export default Navigation;
