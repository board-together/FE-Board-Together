import React from 'react'
import { Link } from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar'
import DeleteUser from '../DeleteUser/DeleteUser'
import '../../assets/Inception_free.ttf'
import './Navbar.css'

export const Navbar = ({ searchBarSubmit, username }) => {

  return (
    <header>
      <div className='navbar-container'>
        <Link to='/dashboard'>
          <div className='logo'>
            <h1 className='app-name-board font-face-inception'>BOARD</h1>
            <h1 className='app-name-together font-face-inception'>TOGETHER</h1>
          </div>
        </Link>
        <div className='searchbar-container'>
          <DeleteUser />
          <h2 className='welcome-greeting'>Welcome, {username}!</h2>
          <Searchbar submit={searchBarSubmit} />
        </div>
      </div>
    </header>
  )
}
