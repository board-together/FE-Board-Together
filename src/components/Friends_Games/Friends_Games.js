import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import SingleGame from '../Single_Game/Single_Game'
import { Navbar } from '../Navbar/Navbar'
import { GET_USER } from '../../GraphQL/queries'
import '../Friends_Games/Friends_Games.css'
import { useQuery } from '@apollo/client'
import { GameModal } from '../Game_Modal/Game_Modal'



export const FriendsGames = ({ searchBarSubmit, userInfo, setModal, modal }) => {
  const friendName = useParams().id
  const { loading, error, data } = useQuery(GET_USER(friendName))
  let friendsGames = data ? data.user.userGames.filter(game => !game.borrowerId) : []
  let friendsGameThumbnails = friendsGames.length ? friendsGames.map((game, index) => <SingleGame key={index} game={game} setModal={setModal}/>) : ''

  return (
    <>
      {modal && <GameModal setModal={setModal} context={'friends_games'} modal={modal} />}
      <div>
        <Navbar username={userInfo.username} searchBarSubmit={searchBarSubmit}></Navbar>
        <Link to={`/dashboard`}>
          <button className='back-to-dash'>Back to dashboard</button>
        </Link>
        <h2 className='friend-name'>{friendName}'s Games</h2>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error loading data: {error.message}</h1>}
        {friendsGames &&
          <div className='friends-games-container'>
            {friendsGameThumbnails}
          </div>
        }
      </div>
    </>
  )
}
