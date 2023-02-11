import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import SingleGame from '../Single_Game/Single_Game'
import { Navbar } from '../Navbar/Navbar'
import '../Friends_Games/Friends_Games.css'



export const FriendsGames = ({searchBarSubmit, userInfo}) => {
  const friendName = useParams().id;
  const fakedFriendsGames = userInfo.games.map(game => <SingleGame key={game.id}  game={game} />)

  
  return (
    <div>
      <Navbar searchBarSubmit={searchBarSubmit}></Navbar>
      <Link to={`/dashboard`}><button>Back to dashboard</button></Link>
          <h2 className='friend-name'>{friendName}s Games</h2>
      <div className='friends-games-container'>
          {fakedFriendsGames}
      </div>
    </div>
  )
}
