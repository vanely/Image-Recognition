import React from 'react';
import '../../FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center sa">
            <div className="FaceRecognition-div center">
                <img id="inputimage" src={imageUrl} alt=""/>
                {/* {div that will be used to render the face detection box over the face} */}
                <div className="bounding_box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;
