import React from 'react'
import Navbar from '../Navbar/Navbar'

export const UserDashboard = ({ userInfo }) => {

  let friends = userInfo.friends.map(friend => <p>{friend}</p>)

  return (
    <>
      <Navbar />
      <h1>My Games</h1>
      <div>UserGames</div>
      <h1>My Friends</h1>
      <div className='friends-list'>{friends}</div>
    </>
  )
}
