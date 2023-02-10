import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Login/Login.css'

export const Login = () => {

  const [userNameInput, setUserNameInput] = useState(''); // input to enter existing username
  const [validUser, setValidUser] = useState(false); // boolean state for whether the username entered in the input already exists or not
  const [userNameMessage, setUserNameMessage] = useState('') // message when a username entered is not valid
  const [existingUserNames, setExistingUserNames] = useState([]); // existing user names, will eventually get these from the backend

  useEffect(() => {
    // Hard coding usernames; as an extension, could do a query on page load.
    setExistingUserNames(["randy", "Pickafloof"])
  }, []);

  useEffect(() => {
    if (existingUserNames.includes(userNameInput)) {
      setValidUser(true);
    } else {
      setValidUser(false);
    }
  }, [userNameInput, existingUserNames]);

  const showError = (event) => {
    event.preventDefault();
    setUserNameMessage('Please enter a valid username');
    setTimeout(setUserNameMessage, 3000);
  }

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
            placeholder='Enter your username'
            value={userNameInput}
          onChange={event => setUserNameInput(event.target.value)}
        />
        {!validUser && <button className='invalid-user-button' onClick={event => showError(event)}>Enter</button>}
        {validUser && <Link to={`dashboard/${userNameInput}`}>
            <button className='enter-site-button'>Enter</button>
          </Link>}
        {userNameMessage && <p className='invalid-name-message'>{userNameMessage}</p>}
      </form>
    </main>
  )
}
