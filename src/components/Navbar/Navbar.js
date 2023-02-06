import React from 'react'
// import Searchbar from '../Searchbar/Searchbar'
import './Navbar.css'



export const Navbar = () => {
  return (
    <div className='navbar-container'> 
      <h2 className='welcome-greeting'>Welcome, {'user.name'}!</h2>
                                                {/* make the above not a string when we take in a user.  */}
      <h1 className='app-name'>Board Together</h1>
     {/* <Searchbar></Searchbar> */}
     {/* having a blocker on how to pass the search results to the search results page  */}
    </div>
  )
}
