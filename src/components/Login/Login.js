import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Login/Login.css'

export const Login = () => {

  const [userNameInput, setUserNameInput] = useState('')

  return (
    <main>
      <div className='login-heading-text-area'>
        <h1 className='login-welcome-text'>Welcome to Board Together</h1>
        <h2 className='login-text'>Login</h2>
      </div>
      <form className='login-form'>
        <input
          className='username-input'
          type='text'
          placeholder='Enter your user name'
          value={userNameInput}
          onChange={event => setUserNameInput(event.target.value)}
        />
        <Link to='/'>
            <button className='enter-site-button'>Enter</button>
        </Link>
        <p>Not a member?</p>
        <button className='create-account-button' type='button'>Create an account</button>
      </form>
    </main>
  )
}
