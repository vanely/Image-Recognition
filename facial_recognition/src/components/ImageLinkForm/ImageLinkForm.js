import React from 'react';
import Tilt from 'react-tilt';

//destructor allowing use of onInputChange without calling props.onInputChange
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className="ImageLink-container">
            <p className="ImageLink-p1 f3">
                {'This magic brain will defect faces in your pictures'}
            </p>
            <Tilt options={{max: 25}}>
                <div className="ImageLink-pattern pa4 br3 shadow-5">
                    <div className="center">
                        <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                        <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
                    </div>
                </div>
            </Tilt>
            
        </div>
    );
}

export default ImageLinkForm;