import React from 'react';

const Rank = ({name, entries}) => {
  return (
    <div style={{display: "grid", justifyContent: "center"}}>
      <div className="white f3">
        {`${name}, your current entry count is...`}
      </div>
      <div className="white f1" style={{display: "grid", justifyContent: "center"}}>
        {entries}
      </div>
    </div>
  );
}

export default Rank;