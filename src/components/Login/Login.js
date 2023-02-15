import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Login/Login.css'
import '../../assets/Inception_free.ttf'

export const Login = ({ setUserName }) => {

  const [userNameInput, setUserNameInput] = useState('') 
  const [validUser, setValidUser] = useState(false) 
  const [userNameMessage, setUserNameMessage] = useState('') 
  const [existingUserNames, setExistingUserNames] = useState([]) 

  useEffect(() => {
    // Hard coding usernames; as an extension, could do a query on page load.
    setExistingUserNames(["Pickafloof", "randy", "abdulredd", "heatherf", "jeff", "drake", "dug", "honey", "jakeandbake"])
  }, [])

  useEffect(() => {
    if (existingUserNames.includes(userNameInput)) {
      setValidUser(true)
      setUserName(userNameInput)
    } else {
      setValidUser(false)
      setUserName('')
    }
  }, [userNameInput, existingUserNames, setUserName])

  const showError = (event) => {
    event.preventDefault()
    setUserNameMessage('Please enter a valid username')
    setTimeout(setUserNameMessage, 2000)
  }

  return (
    <main>
      <div className='login-heading-text-area'>
        <p className='tagline'>Welcome! Let's get...</p>
        <h1 className='login-board'>Board</h1>
        <h1 className='login-together'>Together</h1>
      </div>
      <div className='login-right'>
        <h2 className='login-text'>Login</h2>
        <form className='login-form'>
          <input
            className='username-input'
            type='text'
            placeholder='Enter your username'
            value={userNameInput}
            onChange={event => setUserNameInput(event.target.value)}
          />
          {(!validUser && !userNameMessage) && <button className='invalid-user-button' onClick={event => showError(event)}>Enter</button>}
          {(validUser && !userNameMessage) && <Link to='/dashboard/'>
              <button className='enter-site-button'>Enter</button>
          </Link>}
          {userNameMessage && <p className='invalid-name-message'>{userNameMessage}</p>}
        </form>
      </div>
    </main>
  )
}
