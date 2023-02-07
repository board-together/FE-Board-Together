import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import './User_Dashboard.css'

export const UserDashboard = ({ userInfo, searchBarSubmit }) => {

  let friends = userInfo.friends.map(friend => <p key={friend} className="friend">{friend}</p>)

  return (
    <>
      <Navbar username={userInfo.username} searchBarSubmit={searchBarSubmit}/>
      <div className='user-dashboard'>
        <div className='game-collection-section'>
          <h1>My Games</h1>
          <div className='game-collection'>UserGames</div>
        </div>
        <div className='friends-section'>
          <h1 className='my-friends-header'>My Friends</h1>
          <div className='friends-list'>{friends}</div>
        </div>
      </div>
    </>
  )
}
