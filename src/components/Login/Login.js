import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Login/Login.css'

export const Login = () => {

  /* Need a prop function to set 'username' state in App? */

  const [userNameInput, setUserNameInput] = useState('');
  const [validUser, setValidUser] = useState(false);
  const [userStatus, setUserStatus] = useState(true);
  const [newUserInput, setNewUserInput] = useState('');
  const [invalidUserName, setInvalidUserName] = useState(false)
  const [existingUserNames, setExistingUserNames] = useState([]);

  useEffect(() => {
    //when page loads, populate existingUserNames with fetch/graphquery etc
    setExistingUserNames(['test1', 'test2'])
  }, []);

  useEffect(() => {
    existingUserNames.includes(userNameInput) ? setValidUser(true) : setValidUser(false);
  }, [userNameInput]);

  const handleNewUserClick = (event) => {
    event.preventDefault();
    setUserStatus(false);
  } 

  const addName = (name) => {
    setUserStatus(true);
    setExistingUserNames([...existingUserNames, name]); 
    setInvalidUserName(false);
    //will need to change to make this a post fetch etc
  }

  const submitNewUser = (event) => {
    event.preventDefault()
    existingUserNames.includes(newUserInput) ? setInvalidUserName(true) : addName(newUserInput)
  }

  return (
    <main>
      <div className='login-heading-text-area'>
        <h1 className='login-welcome-text'>Welcome to Board Together</h1>
        <h2 className='login-text'>Login</h2>
      </div>
      {userStatus && <>
        <form className='login-form'>
          <input
            className='username-input'
            type='text'
            placeholder='Enter your username'
            value={userNameInput}
            onChange={event => setUserNameInput(event.target.value)}
          />
          {validUser && <Link to='/'>
              <button className='enter-site-button'>Enter</button>
          </Link>}
        </form>
        <div className='not-member-prompt-area'>
          <p className='not-member-prompt'>Not a member?</p>
          <button 
            className='create-account-button' 
            type='button'
            onClick={event => handleNewUserClick(event)}
          >
            Create an account
          </button>
        </div>      
        </>
      }
      {!userStatus &&
        <form className='create-user-form'>
          <input
            className='new-user-input'
            type='text'
            placeholder='Type the username you want to have'
            value={newUserInput}
            onChange={event => setNewUserInput(event.target.value)}
          />
          <button
            className='create-new-user-button'
            onClick={event => submitNewUser(event)}
          >
            Create
          </button>
          {invalidUserName && <p>Username already taken!</p>}
        </form>
      }
    </main>
  )
}
