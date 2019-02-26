import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center sa">
      <div className="FaceRecognition-div center">
        <img id="inputimage" src={imageUrl} alt=""/>
        {/* face detection box bordering image} */}
        <div className="bounding_box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;