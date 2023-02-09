import './Searchbar.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SearchBar = ({ submit }) => {
  const [searchTerm, setSearchTerm] = useState('')


  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = () => {
    submit(searchTerm)
  }


  return (
    <form className='search-bar'>
      <input
        className='search-input'
        type="text"
        placeholder='Look for a game!'
        value={searchTerm}
        onChange={handleChange}
      />
      <Link to={`/search-results/${searchTerm}`}>
        <button className='search-button' onClick={() => handleSubmit()}>Search</button>
      </Link>
    </form>
  )
}

export default SearchBar