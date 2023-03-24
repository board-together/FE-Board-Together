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
  }, [])

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

/*
let googleObj = {
  aud: "1035464443855-ume25mrk6ce6jhnckuk9ctoedm6gacce.apps.googleusercontent.com",
  azp: "1035464443855-ume25mrk6ce6jhnckuk9ctoedm6gacce.apps.googleusercontent.com",
  email: "hi.iamzacchaeus@gmail.com",
  email_verified: true,
  exp: 1679625197,
  family_name: "Zacchaeus",
  given_name: "I am",
  iat: 1679621597,
  iss: "https://accounts.google.com",
  jti: "34b250accca7cd82400e52170dc9b1514b45f774",
  name: "I am Zacchaeus",
  nbf: 1679621297,
  picture: "https://lh3.googleusercontent.com/a/AGNmyxaC4lqjd7SGCZBgj4DNXzHBVQdbQg2EMFQ9JjAm=s96-c",
  sub: "112001238777884617065",
}
*/

export default GoogleButton