import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { GameModal } from '../Game_Modal/Game_Modal'
import SingleGame from '../Single_Game/Single_Game'
import './User_Dashboard.css'
import fakeBorrowedGames from '../../dummy-borrowed-games.json'


export const UserDashboard = ({ userInfo, searchBarSubmit, deleteGame, setModal, modal, loading, error, data, userName }) => {

  let borrowedGamesThumbnails = fakeBorrowedGames.games.map((game, index) => <SingleGame key={index} game={game} setModal={setModal}/>)
  const friends = userInfo.friends.map(friend => <p key={friend} className="friend">{friend}</p>)
  const games = userInfo.games.map(game => <SingleGame key={game.id} game={game} setModal={setModal} />)

  return (
    <>
      {modal && <GameModal setModal={setModal} deleteGame={deleteGame} context={'user_dashboard'} modal={modal} />}
      <Navbar username={userName} searchBarSubmit={searchBarSubmit} />
      <div className='user-dashboard'>
        {error && <h1>Error loading data: {error.message}</h1>}
        {loading && <h1>Loading...</h1>}
        {data && <>
          <div className='game-collection-section'>
            <h1 className='my-games-heading'>My Games</h1>
            <h2>Games I'm Borrowing</h2>
            <div className='borrowed-games-collection'>{borrowedGamesThumbnails}</div>
            <h2>My Game Collection</h2>
            <div className='game-collection'>{games}</div>
          </div>
          <div className='friends-section'>
            <h1 className='my-friends-header'>My Friends</h1>
            <div className='friends-list'>{friends}</div>
          </div>
        </>}
      </div>
    </>
  )
}
