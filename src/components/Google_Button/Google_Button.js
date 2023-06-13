import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { VALIDATE_USER } from '../../GraphQL/queries'
import jwt_decode from 'jwt-decode'
import './Google_Button.css'

function GoogleButton({ setUserName, setIsValid, createUserFunc }) {

  const [googleUser, setGoogleUser] = useState({})
  const [validateUser, { data }] = useLazyQuery(VALIDATE_USER, { variables: { username: googleUser.given_name } })

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById('googleSignIn'),
      { theme: "outline", size: "large" }
    )
  })

  useEffect(() => {
    if (data && googleUser.given_name) {
      setUserName(googleUser.given_name)
      setIsValid(true)
    } else if (googleUser.given_name) {
      async function createUserAndProceed() {
        await createUserFunc({ variables: { input: { username: googleUser.given_name } } })
        setUserName(googleUser.given_name)
        setIsValid(true)
      }
      createUserAndProceed()
    }
  }, [data, googleUser, setIsValid, setUserName, createUserFunc])

  

  async function handleCallbackResponse(response) {
    const userInfo = jwt_decode(response.credential)
    setGoogleUser(userInfo)
    await validateUser()
  }

  return (
    <div id='googleSignIn'></div>
  )
}

export default GoogleButton