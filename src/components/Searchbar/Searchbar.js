import './Searchbar.css'
import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // code to fetch board games matching the search term and update the results state
  };

  return (
    <form className='search-bar' onSubmit={handleSubmit}>
      <input type="text" placeholder='Look for a game!' value={searchTerm} onChange={handleChange} />
      <button type="submit">Search</button>
      <ul>
        {results.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </form>
  );
};

export default SearchBar;