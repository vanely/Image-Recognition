import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="ImageLink-container">
      <p className="ImageLink-p1">
          {'Enter image URL for face detection'}
      </p>
        <div className="ImageLink">
          <div className="input">
            <input type="text" onChange={onInputChange}/>
            <button onClick={onButtonSubmit}>Detect</button>
          </div>
        </div>      
    </div>
  );
}

export default ImageLinkForm;