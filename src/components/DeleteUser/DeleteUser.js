import React, { useState, useEffect } from 'react'
import "./DeleteUser.css"
import { Link, useNavigate } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_USER_ID } from '../../GraphQL/queries'
import { DELETE_USER } from '../../GraphQL/mutations'
import user from "../../assets/user-solid.svg"

function DeleteUser() {

  const [toggle, setToggle] = useState(true)
  const [confirmUsername, setConfirmUsername] = useState('')
  const [userId, setUserId] = useState(null)
  const [errorMessage, setErrorMessage] = useState(false)
  const [getUserId, { data, error }] = useLazyQuery(GET_USER_ID, { variables: { username: confirmUsername } })
  const deleteUserMutation = useMutation(DELETE_USER)
  const deleteUserFunc = deleteUserMutation[0]
  const deleteUserResponse = deleteUserMutation[1]

  useEffect(() => {
    deleteUserFunc({ variables: { input: userId } })
  }, [userId])

  const handleClick = (e) => {
    let target = e.target.id
    if (target === 'user-options-icon') {
      document.getElementById('delete-user-container').classList.toggle('hidden')
      e.target.classList.toggle('user-options-icon-focus')
      setToggle(true)
    } else {
      document.getElementById('confirmation-container').classList.toggle('hidden')
    }
  }

  const handleDelete = async () => {
    await getUserId()
    if (data) {
      setUserId(data)
    } else {
      setErrorMessage(true)
    }
  }

  const confirmation = <div className='confirmation-container' id='confirmation-container'>
    <p style={{ 'fontSize': '14px', 'fontStyle': 'italic' }}>Please type your username below to confirm account deletion</p>
    <input type='text' className='confirmation' onChange={(event) => setConfirmUsername(event.target.value)}></input>
    <div className='confirmation-buttons'>
      <button onClick={handleDelete}>Ok, Delete It</button>
      <button onClick={() => setToggle(true)}>Nevermind</button>
    </div>
  </div>

  return (
    <>
      <img src={user} alt='user options' className='user-options-icon' id='user-options-icon' onClick={(event) => handleClick(event)} />
      <div className='delete-user-container hidden' id='delete-user-container'>
        <div className='delete-user'>
          {toggle &&
            <>
              <Link to={'/'} className='link-to-login'>Log Out</Link>
              <button className='delete-user-button' id='delete-user-button' onClick={() => setToggle(false)}>Delete My Account</button>
            </>
          }
          {!toggle && confirmation}
          {!!errorMessage && <p>That Didn't Work For Some Reason</p>}
        </div>
      </div>
    </>
  )
}

export default DeleteUser