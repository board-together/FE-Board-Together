import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { GameModal } from '../Game_Modal/Game_Modal'
import SingleGame from '../Single_Game/Single_Game'
import './User_Dashboard.css'

export const UserDashboard = ({ userInfo, searchBarSubmit, deleteGame, setModal, modal }) => {

  const friends = userInfo.friends.map(friend => <p key={friend} className="friend">{friend}</p>)
  const games = userInfo.games.map(game => <SingleGame key={game.id} game={game} setModal={setModal} />)

  return (
    <>
      {modal && <GameModal setModal={setModal} deleteGame={deleteGame} context={'user_dashboard'} modal={modal} />}
      <Navbar username={userInfo.username} searchBarSubmit={searchBarSubmit} />
      <div className='user-dashboard'>
        <div className='game-collection-section'>
          <h1>My Games</h1>
          <div className='game-collection'>{games}</div>
        </div>
        <div className='friends-section'>
          <h1 className='my-friends-header'>My Friends</h1>
          <div className='friends-list'>{friends}</div>
        </div>
      </div>
    </>
  )
}
