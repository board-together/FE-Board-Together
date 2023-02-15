import * as React from 'react';
import '../ErrorPage/Error_Page.css'

const ErrorPage = ({error}) => {
  return (
    <div className='error-container'>
      {console.log(error)}
      <h2 className='error-title'>Oh No!...It looks like we do not have a record of that game</h2>
    </div>
  )
}


export default ErrorPage;