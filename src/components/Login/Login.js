import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useLazyQuery } from '@apollo/client'
import '../Login/Login.css'
import '../../assets/Inception_free.ttf'
import { GET_ALL_USERS, VALIDATE_USER } from '../../GraphQL/queries'

export const Login = ({ setUserName }) => {

  const [userNameInput, setUserNameInput] = useState('')
  const [userNameMessage, setUserNameMessage] = useState('')

  const { loading, error, data } = useQuery(GET_ALL_USERS)
  const [validateUser, response] = useLazyQuery(VALIDATE_USER)

  useEffect(() => {
    if (response.data) {
      setUserName(userNameInput)
    } else {
      setUserName('')
    }
  }, [userNameInput, setUserName, response.data])

  const handleChange = async (e) => {
    console.log()
    await validateUser({ variables: e.target.value })
    setUserNameInput(response.data)
  }

  const showError = (event) => {
    event.preventDefault()
    setUserNameMessage('Please enter a valid username')
    setTimeout(setUserNameMessage, 2000)
  }

  var ConditionalLink = (data && !userNameMessage) ? <Link to='/dashboard/' /> : <button className='invalid-user-button' onClick={event => showError(event)}>Enter</button>

  return (
    <main>
      <div className='login-heading-text-area'>
        <h2 className='tagline'>Welcome! Let's get...</h2>
        <h1 className='login-board'>Board</h1>
        <h1 className='login-together'>Together</h1>
      </div>
      <div className='login-right'>
        <h2 className='login-text'>Login</h2>
        <form className='login-form'>
          {/* <select name='username-select' className='username-select' value={userNameInput} onChange={event => setUserNameInput(event.target.value)}>
            <option>Select a username to proceed...</option>
            {data.users.map(username => <option>{username}</option>)}
          </select> */}
          <input
            className='username-input'
            name='username-input'
            type='text'
            placeholder='Enter your username'
            value={userNameInput}
            onChange={event => handleChange(event)}
          />
          <ConditionalLink>
            <button className='enter-site-button'>Enter</button>
          </ConditionalLink>
          {userNameMessage && <p className='invalid-name-message'>{userNameMessage}</p>}
        </form>
      </div>
    </main>
  )
}
