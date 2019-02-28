import React from 'react';
import './Rank.css';

const Rank = ({entries}) => {
  return (
    <div className="Rank-EntryContainer">
      <div className="Rank-EntryText">
        <p>Current entry count</p>
      </div>
      <div className="Rank">
        <p className="bar"></p>
        <p className="entry">{entries}</p>
      </div>
    </div>
  );
}

export default Rank;