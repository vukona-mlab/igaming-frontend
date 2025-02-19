import React, { useState, useEffect } from "react";
import SearchBar from "./components/seachButton/seachButton"; // Import the SearchBar component

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Track the search input
  const [filteredNames, setFilteredNames] = useState([]); // Store filtered names

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update the search query as user types
  };

  // Simulated list of names for demo
  const people = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Charlie Black",
  ];

  // Filter the names based on the search query
  useEffect(() => {
    const result = people.filter((person) =>
      person.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNames(result);

    // Log the filtered names if results are found
    if (result.length > 0) {
      console.log("Results found:", result); // Log the filtered results
    }
  }, [searchQuery]); // Dependency on searchQuery to re-run when it changes

  return (
    <div style={{ padding: "20px" }}>
      <h1>Landing Page</h1>
      <SearchBar value={searchQuery} onChange={handleSearch} /> {/* Passing props to SearchBar */}

      <h2>Search Results:</h2>
      {filteredNames.length > 0 ? (
        <ul>
          {filteredNames.map((person, index) => (
            <li key={index}>{person}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default LandingPage;
