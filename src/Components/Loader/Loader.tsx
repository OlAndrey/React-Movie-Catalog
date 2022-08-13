import React from 'react';
import '../../styles/Loader.css';

const Loader = () => {
  return (
    <div className="lds-container">
      <div className="lds-dual-ring" />
    </div>
  );
};

export default Loader;
