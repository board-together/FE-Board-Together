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
  const usernameQuery = useLazyQuery(VALIDATE_USER, { variables: { username: userNameInput } })
  const validateUser = usernameQuery[0]
  const usernameData = usernameQuery[1].data

  useEffect(() => {
    if (usernameData) {
      setUserName(usernameData.user.username)
    } else {
      setUserName('')
    }
  }, [userNameInput, setUserName, usernameData])

  const handleChange = async (e) => {
    setUserNameInput(e.target.value)
    await validateUser()
  }

  const showError = (event) => {
    event.preventDefault()
    setUserNameMessage('Please enter a valid username')
    setTimeout(setUserNameMessage, 2000)
  }

  if (!loading && !error) {
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
              {data.users.map(user => <option key={user.id}>{user.username}</option>)}
            </select> */}
            <input
              className='username-input'
              name='username-input'
              type='text'
              placeholder='Enter your username'
              value={userNameInput}
              onChange={event => handleChange(event)}
            />
            {(!usernameData && !userNameMessage) && <button className='invalid-user-button' onClick={event => showError(event)}>Enter</button>}
            {(usernameData && !userNameMessage) && <Link to='/dashboard/'>
              <button className='enter-site-button'>Enter</button>
            </Link>}
            {userNameMessage && <p className='invalid-name-message'>{userNameMessage}</p>}
            <div className='login-messages'>
              <p className='create-user-message'>Don't Have A Username Yet? Create one!</p>
              <p className='demo-message'>For Demo Purposes, Proceed As A Random User. Click Here</p>
            </div>
          </form>
        </div>
      </main>
    )
  }
}

// export const Login = ({ setUserName }) => {

//   const [userNameInput, setUserNameInput] = useState('')
//   const [userNameMessage, setUserNameMessage] = useState('')

//   const { loading, error, data } = useQuery(GET_ALL_USERS)
//   const usernameQuery = useLazyQuery(VALIDATE_USER, { variables: { username: userNameInput } })
//   const validateUser = usernameQuery[0]
//   const usernameData = usernameQuery[1].data

//   useEffect(() => {
//     if (usernameData) {
//       setUserName(usernameData.user.username)
//     } else {
//       setUserName('')
//     }
//   }, [userNameInput, setUserName, usernameData])

//   const handleChange = async (e) => {
//     setUserNameInput(e.target.value)
//     await validateUser()
//   }

//   const showError = (event) => {
//     event.preventDefault()
//     setUserNameMessage('Please enter a valid username')
//     setTimeout(setUserNameMessage, 2000)
//   }

//   // const randomUser = () => {
//   //   let randomNum = Math.floor(Math.random(data.users.length) + 1)
//   //   return data.users[randomNum]
//   // }

//   //const randomUserLink = <Link to='/dashboard/' onClick={setUserName(randomUser)}>Click Here.</Link>

//   if (!loading && !error) {
//     return (
//       <main>
//         <div className='login-heading-text-area'>
//           <h2 className='tagline'>Welcome! Let's get...</h2>
//           <h1 className='login-board'>Board</h1>
//           <h1 className='login-together'>Together</h1>
//         </div>
//         <div className='login-right'>
//           <h2 className='login-text'>Login</h2>
//           <form className='login-form'>
//             {/* <select name='username-select' className='username-select' value={userNameInput} onChange={event => setUserNameInput(event.target.value)}>
//               <option>Select a username to proceed...</option>
//               {data.users.map(user => <option key={user.id}>{user.username}</option>)}
//             </select> */}
//             <input
//               className='username-input'
//               name='username-input'
//               type='text'
//               placeholder='Enter your username'
//               value={userNameInput}
//               onChange={event => handleChange(event)}
//             />
//             {(!usernameData && !userNameMessage) && <button className='invalid-user-button' onClick={event => showError(event)}>Enter</button>}
//             {(usernameData && !userNameMessage) && <Link to='/dashboard/'>
//               <button className='enter-site-button'>Enter</button>
//             </Link>}
//             {userNameMessage && <p className='invalid-name-message'>{userNameMessage}</p>}
//             {/* <div className='login-messages'>
//               <p className='create-user-message'>Don't Have A Username Yet? Create one!</p>
//               <p className='demo-message'>For Demo Purposes, Proceed As A Random User. </p>
//             </div> */}
//           </form>
//         </div>
//       </main>
//     )
//   }
// }