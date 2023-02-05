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
    // pass results to the search results page via props 
  };

  // {
  //   "type": "game",
  //     "id": "id",
  //       "attributes": {
  //     "board_game_atlas_id": ,
  //     "name": ,
  //     "min_players": ,
  //     "max_players": ,
  //     "min_playtime": ,
  //     "max_playtime": ,
  //     "min_age": ,
  //     "year_published": ,
  //     "description": ,
  //     "thumb_url": ,
  //     "image_url": ,
  //     "url":
  //   }
  // }

  return (
    <form className='search-bar' onSubmit={handleSubmit}>
      <input className='search-input' type="text" placeholder='Look for a game!' value={searchTerm} onChange={handleChange} />
      {/* make search button a router link that routes to the search results page using the terms as an id '/search-results/:searchTerm' */}
      <button className='search-button' type="submit">Search</button>
    </form>
  );
};

export default SearchBar;