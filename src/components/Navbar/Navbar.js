import React from 'react'
import Searchbar from '../Searchbar/Searchbar'
import './Navbar.css'




export const Navbar = ({ searchBarSubmit, username }) => {

  return (
    <div className='navbar-container'>
      <h1 className='app-name'>B O A R D TOGETHER</h1>
      <div className='searchbar-container'>
        <h2 className='welcome-greeting'>Welcome, {username}!</h2>
        <Searchbar submit={searchBarSubmit} />
      </div>
    </div>
  )
}
