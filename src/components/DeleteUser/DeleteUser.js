import React, { useState } from 'react'
import "./DeleteUser.css"
import { Link } from 'react-router-dom'
import user from "../../assets/user-solid.svg"

function DeleteUser() {

  const handleClick = (e) => {
    if (e) {
      document.getElementById('delete-user-container').classList.toggle('hidden')
      e.target.classList.toggle('user-options-icon-focus')
    } else {
      document.getElementById('confirmation-container').classList.toggle('hidden')
    }
  }

  return (
    <>
      <img src={user} alt='user options' className='user-options-icon' id='user-options-icon' onClick={(event) => handleClick(event)} />
      <div className='delete-user-container hidden' id='delete-user-container'>
        <div className='delete-user'>
          <Link to={'/'} className='link-to-login'>Log Out</Link>
          <button className='delete-user-button' id='delete-user-button' onClick={handleClick}>Delete My Account</button>
          <div className='confirmation-container hidden' id='confirmation-container'>
            <p style={{ 'fontSize': '14px', 'fontStyle': 'italic' }}>Please type your username below to confirm account deletion</p>
            <input type='text' className='confirmation'></input>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteUser