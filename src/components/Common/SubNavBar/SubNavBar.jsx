import React from 'react';
import './SubNavBar.css';
import SectionContainer from '../../SectionContainer';

export default function SubNavBar() {
  return (
    <SectionContainer containerColor={'black'}>
      <div className="subnav">
        <div className="subnav-content">
          <a href="#company">Game Development</a>
          <a href="#team">Creative and Design</a>
          <a href="#careers">Audio and Music</a>
          <a href="#company">Quality Assurance</a>
          <a href="#team">Compliance and Legal</a>
          <a href="#careers">Content and Marketing</a>
        </div>
      </div>
    </SectionContainer>


  )
}