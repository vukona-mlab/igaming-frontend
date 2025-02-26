import React from 'react';
import Navbar from '../Navbar/navbar';
import SubNavBar from '../SubNavBar/SubNavBar';
import './CompBar.css';

const CompBar = () => {
  return (
    <div className="comp-bar">
      <Navbar />
      <SubNavBar />
    </div>
  );
};

export default CompBar; 