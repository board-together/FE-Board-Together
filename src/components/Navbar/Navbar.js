import React from 'react'
import Searchbar from '../Searchbar/Searchbar'
import './Navbar.css'




export const Navbar = ({ searchBarSubmit, username }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 const formatedUsername =  capitalizeFirstLetter(username)
  return (
    <div className='navbar-container'>
      <h2 className='welcome-greeting'>Welcome, {formatedUsername}!</h2>
      <h1 className='app-name'>Board Together</h1>
      <Searchbar submit={searchBarSubmit} />
    </div>
  )
}
