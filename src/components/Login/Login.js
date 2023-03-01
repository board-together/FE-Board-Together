import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/client'
import '../Login/Login.css'
import '../../assets/Inception_free.ttf'
import { VALIDATE_USER } from '../../GraphQL/queries'
import { CREATE_USER} from '../../GraphQL/mutations'

export const Login = ({ setUserName }) => {

  const navigate = useNavigate()
  const [userNameInput, setUserNameInput] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [confirmUsername, setConfirmUsername] = useState('')
  const [userNameMessage, setUserNameMessage] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [createUser, setCreateUser] = useState(false)
  const [usernameMismatch, setUserNameMismatch] = useState(false)
  const [validateUser, { data }] = useLazyQuery(VALIDATE_USER, { variables: { username: userNameInput } })

  useEffect(() => {
    if (data) {
      setUserName(data.user.username)
    } else {
      setUserName('')
    }
  }, [userNameInput, setUserName, data])

  useEffect(() => {
    if (isValid) {
      navigate('../dashboard/')
    }
  }, [isValid, navigate])

  const handleChange = (e) => {
    setUserNameInput(e.target.value)
    validateUser()
  }

  const handleClick = (event) => {
    event.preventDefault()
    if (data) {
      setIsValid(true)
    } else {
      showError(event)
    }
  }

  const showError = (event) => {
    event.preventDefault()
    setUserNameMessage('Please enter a valid username')
    setTimeout(setUserNameMessage, 2000)
  }

  const signInForm =
    <form className='login-form'>
      <input
        className='username-input'
        name='username-input'
        type='text'
        placeholder='Enter Username'
        value={userNameInput}
        onChange={event => handleChange(event)}
      />
      {!userNameMessage && <button className='enter-site-button' onClick={(event) => handleClick(event)}>Enter</button>}
      {userNameMessage && <p className='invalid-name-message'>{userNameMessage}</p>}
      <div className='login-messages'>
        <span className='create-message'>
          <p className='create-user-message'>Don't Have A Username Yet?</p>
          <p onClick={() => setCreateUser(true)} className='create-user-button'>Create one!</p>
        </span>
        {/* <p className='demo-message'>For Demo Purposes, Proceed As A Random User. Click Here</p> */}
      </div>
    </form>

  const createUserForm =
    <form className='login-form'>
      <input
        className='username-input'
        name='username-input'
        type='text'
        placeholder='Username'
        value={userNameInput}
        onChange={event => handleChange(event)}
      />
      <input
        className='username-input'
        name='username-input'
        type='text'
        placeholder='Confirm Username'
        value={userNameInput}
        onChange={event => handleChange(event)}
      />
      <button className='enter-site-button' onClick={() => console.log("cool")}>Create Account</button>
      <p onClick={() => setCreateUser(false)} className='cancel-button'>Cancel</p>
      {userNameMessage && <p className='invalid-name-message'>{userNameMessage}</p>}
    </form>

  return (
    <main>
      <div className='login-heading-text-area'>
        <h2 className='tagline'>Welcome! Let's get...</h2>
        <h1 className='login-board'>Board</h1>
        <h1 className='login-together'>Together</h1>
      </div>
      <div className='login-right'>
        <h2 className='login-text'>Login</h2>
        {!createUser && signInForm}
        {createUser && createUserForm}
      </div>
    </main>
  )
}