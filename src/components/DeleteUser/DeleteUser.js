import React, { useState } from 'react'
import "./DeleteUser.css"
import { Link } from 'react-router-dom'
import user from "../../assets/user-solid.svg"

function DeleteUser() {

  const [toggle, setToggle] = useState(false)

  const handleClick = (e) => {
    document.getElementById('delete-user-container').classList.toggle('hidden')
    e.target.classList.toggle('user-options-icon-focus')
  }

  return (
    <>
      <img src={user} alt='user options' className='user-options-icon' id='user-options-icon' onClick={(event) => handleClick(event)} />
      <div className='delete-user-container hidden' id='delete-user-container'>
        <div className='delete-user'>
          Delete My Account
          <Link to={'/'} className='link-to-login'>Log Out</Link>
        </div>
      </div>
    </>
  )
}

export default DeleteUser