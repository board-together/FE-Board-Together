import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import './Google_Button.css'

function GoogleButton() {

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

  function handleCallbackResponse(response) {
    console.log('JWT CREDENTIAL:', response.credential)
    const userInfo = jwt_decode(response.credential)
    console.log("USER INFO:", userInfo)
  }

  return (
    <div id='googleSignIn'></div>
  )
}

export default GoogleButton