import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Login/Login.css'

export const Login = () => {

  /* Need a prop function to set 'username' state in App? */

  const [userNameInput, setUserNameInput] = useState(''); // input to enter existing username
  const [validUser, setValidUser] = useState(false); // boolean state for whether the username entered in the input already exists or not
  const [userStatus, setUserStatus] = useState(true); // an assumption that the user has already signed up; if the username form is present, this is true, and if create user form is present, this is false
  const [newUserInput, setNewUserInput] = useState(''); // input to create/enter a new username
  const [invalidUserName, setInvalidUserName] = useState(false); // boolean state for whether a new username the user wants to create is already taken
  const [existingUserNames, setExistingUserNames] = useState([]); // existing user names, will eventually get these from the backend

  useEffect(() => {
    //when page loads, populate existingUserNames with fetch/graphquery etc
    setExistingUserNames(['test1', 'test2'])
  }, []);

  useEffect(() => {
    existingUserNames.includes(userNameInput) ? setValidUser(true) : setValidUser(false);
  }, [userNameInput, existingUserNames]);

  const handleNewUserClick = (event) => {
    event.preventDefault();
    setUserStatus(false);
    setUserNameInput('');
  } 

  const addName = (name) => {
    setUserStatus(true);
    setExistingUserNames([...existingUserNames, name]); 
    setInvalidUserName(false);
    setNewUserInput('');
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
          <button className='create-account-button' type='button' onClick={event => handleNewUserClick(event)}>
            Create an account
          </button>
        </div>      
      </>}
      {!userStatus &&
        <form className='create-user-form'>
          <input
            className='new-user-input'
            type='text'
            placeholder='Type the username you want to have'
            value={newUserInput}
            onChange={event => setNewUserInput(event.target.value)}
          />
          <button className='create-new-user-button' onClick={event => submitNewUser(event)}
          >
            Create
          </button>
          {invalidUserName && <p>Username already taken!</p>}
        </form>
      }
    </main>
  )
}
