import * as React from 'react';
import { Link } from 'react-router-dom';

import './ErrorPage.css'




const ErrorPage = () => {
  return (
    <div className='error-container'>
      <h2 className='error-heading'>Oh No!</h2>
      <article className='error-message-cont'>
        <p className='error-message'>
          404 This URL seems to be incorect please try again later 404 <Link to={`/dashboard/`}><button>Back to dashboard</button></Link>
        </p>
      </article>
    </div>
  )
}


export default ErrorPage;