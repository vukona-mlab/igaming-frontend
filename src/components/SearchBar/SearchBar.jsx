import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import SectionContainer from '../SectionContainer';

const SearchBar = ({ placeholder, onSearch }) => {
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      onSearch(e.target.value);
    }

  };

  return (
    // <SectionContainer containerColor={'red'}>
    <div className="search-container">
      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          onKeyDown={handleEnter}
        />
      </div>
    </div>
    // {/* </SectionContainer> */}

  );
};

export default SearchBar; 