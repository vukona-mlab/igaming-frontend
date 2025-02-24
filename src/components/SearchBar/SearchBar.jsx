import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ placeholder = "Search..." }) => {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input 
          type="text" 
          className="search-input"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default SearchBar; 