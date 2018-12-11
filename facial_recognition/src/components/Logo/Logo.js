import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';

const Logo = () => {
  return(
    <div className="Logo-super ma4 mt0">
      <Tilt className="Logo-container Tilt br2 shadow-2" options={{max: 25}} style={{height: 150, width: 150}}>
        <div>
          <div className="Tilt-inner pa3" style={{textAlign: 'center'}}>
            <img src={brain} alt="brain"/>
          </div>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
