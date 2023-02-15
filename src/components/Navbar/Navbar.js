import React from 'react'
import { Link } from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar'
import './Navbar.css'




export const Navbar = ({ searchBarSubmit, username }) => {

  return (
    <header>
      <div className='navbar-container'>
        <h2 className='welcome-greeting'>Welcome, {username}!</h2>
        <Link to='/dashboard'>
          <h1 className='app-name'>Board Together</h1>
        </Link>
        <Searchbar submit={searchBarSubmit} />
      </div>
      <Link to={'/'} className='link-to-login'>Login as another user</Link>
    </header>
  )
}
