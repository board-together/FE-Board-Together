import React from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <main>
      <div>
        <h1>Welcome to Board Together</h1>
        <p>Login</p>
      </div>
      <div>
        <input />
        <Link to='/'>
            <button>Enter</button>
        </Link>
        <p>Not a member?</p>
      </div>
    </main>
  )
}
