import React from 'react'
import Searchbar from '../Searchbar/Searchbar'
import './Navbar.css'








export const Navbar = () => {
  return (
    <div className='navbar-container'> 
      <h2 className='welcome-greeting'>Welcome User</h2>
      <h1 className='app-name'>Board Together</h1>
     <Searchbar></Searchbar>
    </div>
  )
}
