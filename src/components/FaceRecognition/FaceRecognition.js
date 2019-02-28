import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="FaceRecognition-container">
      <div className="FaceRecognition-div">
        <img id="inputimage" src={imageUrl} alt=""/>
        {/* face detection box bordering image} */}
        <div className="FaceRecognition-bounding_box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;