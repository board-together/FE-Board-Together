import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Login/Login.css'

export const Login = () => {

  const [userNameInput, setUserNameInput] = useState(''); // input to enter existing username
  const [validUser, setValidUser] = useState(false); // boolean state for whether the username entered in the input already exists or not
  const [userNameMessage, setUserNameMessage] = useState('') // message when a username entered is not valid
  const [userStatus, setUserStatus] = useState(true); // an assumption that the user has already signed up; if the username form is present, this is true, and if create user form is present, this is false
  const [newUserInput, setNewUserInput] = useState(''); // input to create/enter a new username
  const [takenUserName, setTakenUserName] = useState(false); // boolean state for whether a new username the user wants to create is already taken
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
  }, [userNameInput, existingUserNames, setUserName]);

  const showError = (event) => {
    event.preventDefault();
    setUserNameMessage('Please enter a valid username');
    setTimeout(setUserNameMessage, 3000);
  }

  const handleNewUserClick = (event) => {
    event.preventDefault();
    setUserStatus(false);
    setUserNameInput('');
  } 

  const addName = (name) => {
    setUserStatus(true);
    setExistingUserNames([...existingUserNames, name]); 
    setTakenUserName(false);
    setNewUserInput('');
    // WIP: will need to refactor to include a query/mutation to add user to backend
  }

  const submitNewUser = (event) => {
    event.preventDefault()
    existingUserNames.includes(newUserInput) ? setTakenUserName(true) : addName(newUserInput)
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
          {!validUser && <button className='invalid-user-button' onClick={event => showError(event)}>Enter</button>}
          {validUser && <Link to={`dashboard/${userNameInput}`}>
              <button className='enter-site-button'>Enter</button>
          </Link>}
          {userNameMessage && <p>{userNameMessage}</p>}
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
          {takenUserName && <p>Username already taken!</p>}
        </form>
      }
    </main>
  )
}
