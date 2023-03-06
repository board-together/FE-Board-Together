import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/client'
import '../Login/Login.css'
import '../../assets/Inception_free.ttf'
import { VALIDATE_USER } from '../../GraphQL/queries'
import { CREATE_USER } from '../../GraphQL/mutations'
import { randomNum } from '../../utils'

export const Login = ({ setUserName }) => {

  const navigate = useNavigate()
  const [userNameInput, setUserNameInput] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [confirmUsername, setConfirmUsername] = useState('')
  const [userNameMessage, setUserNameMessage] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [createUser, setCreateUser] = useState(false)
  const [success, setSuccess] = useState(false)
  const [validateUser, { data }] = useLazyQuery(VALIDATE_USER, { variables: { username: userNameInput } })
  const createUserResponse = useMutation(CREATE_USER)
  const createUserFunc = createUserResponse[0]
  const createUserData = createUserResponse[1].data
  const error = createUserResponse[1].error
  let usernames = ["Pickafloof", "randy", "abdulredd", "heatherf", "jeff", "drake", "dug", "honey", "jakeandbake"]

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

  useEffect(() => {
    if (error) {
      showError(null, 'Warning: Username Already Exists')
    } else if (createUserData) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setCreateUser(false)
      }, 3000)
    }
  }, [error, createUserData])

  const handleChange = (e) => {
    console.log(e.target)
    setUserNameInput(e.target.value)
    validateUser()
  }

  const handleClick = (event) => {
    event.preventDefault()
    if (data) {
      setIsValid(true)
    } else {
      showError(event, 'Please enter a valid username')
    }
  }

  const submitCreateUser = (event) => {
    event.preventDefault()
    if (newUsername !== confirmUsername || !newUsername.length) {
      showError(event, 'Username entries do not match!')
      setTimeout(setUserNameMessage, 3000)
    } else {
      createUserFunc({ variables: { input: { username: newUsername } } })
    }
  }

  const showError = (event, message) => {
    if (event) {
      event.preventDefault()
    }
    setUserNameMessage(message)
    setTimeout(setUserNameMessage, 3000)
  }

  const signInForm =
    <>
      <form className='login-form'>
        <div className='username-input-section'>
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
        </div>
        <div className='login-messages'>
          <span className='create-message'>
            <p className='create-user-message'>Don't Have A Username Yet?</p>
            <p onClick={() => setCreateUser(true)} className='create-user-button'>Create One!</p>
          </span>
        </div>
      </form>
      <span className='create-message'>
        <p className='demo-message'>To proceed as a random user, click</p>
        <p
          onClick={async() => {
            setUserNameInput(usernames[randomNum(usernames.length)])
            await validateUser()
          }}
          className='demo-message-button'
        >
          here.
        </p>
      </span>
    </>

  const createUserForm =
    <form className='login-form'>
      <input
        className='username-input'
        name='username-input'
        type='text'
        placeholder='Username'
        value={newUsername}
        onChange={event => setNewUsername(event.target.value)}
      />
      <input
        className='username-input'
        name='username-input'
        type='text'
        placeholder='Confirm Username'
        value={confirmUsername}
        onChange={event => setConfirmUsername(event.target.value)}
      />
      {(!userNameMessage && !success) && <button className='enter-site-button' onClick={(event) => submitCreateUser(event)}>Create Account</button>}
      {(userNameMessage && !success) && <p className='invalid-name-message'>{userNameMessage}</p>}
      {(success && !error) && <p className='success-message'>Account Successfully Created!</p>}
      <p onClick={() => setCreateUser(false)} className='cancel-button'>Cancel</p>
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