import * as React from 'react';
import '../ErrorPage/Error_Page.css'
import { Navbar } from '../Navbar/Navbar';
import { Link } from 'react-router-dom';



const ErrorPage = () => {
  return (
    <main>
      {/* <Navbar/> */}
      <section className='wrong-url-section'>
        <h1 className='incorrect-url-error-message'>It seems you have entered the wrong url, go back to the login page.</h1>
        <Link to={`/`}>
          <button className='go-back-button'>Back to Login</button>
        </Link>
      </section>
    </main>
  )
}
  



export default ErrorPage;