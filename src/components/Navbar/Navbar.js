import React from 'react'
import { Link } from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar'
import './Navbar.css'




export const Navbar = ({ searchBarSubmit, username }) => {

  return (
    <header>
      <div className='navbar-container'>
        <Link to='/dashboard'>
          <div className='logo'>
            <h1 className='app-name'>BOARD</h1>
            <h1 className='app-name'>TOGETHER</h1>
          </div>
        </Link>
        <div className='searchbar-container'>
          <h2 className='welcome-greeting'>Welcome, {username}!</h2>
          <Searchbar submit={searchBarSubmit} />
          <Link to={'/'} className='link-to-login'>Log Out</Link>
        </div>
      </div>

    </header>
  )
}
