import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { GET_USER } from '../../GraphQL/queries'
import { useQuery } from "@apollo/client"
import SingleGame from '../Single_Game/Single_Game'
import './User_Dashboard.css'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export const UserDashboard = ({ userInfo, searchBarSubmit }) => {

  const userName = useParams().username;
  const { loading, error, data } = useQuery(GET_USER(userName));

  let friends = userInfo.friends.map(friend => <p key={friend} className="friend"><Link to={`/friends-games/${friend}`}>{friend}</Link></p>)
  let games = userInfo.games.map(game => <SingleGame key={game.id} game={game}/>)

  return (
    <>
      <Navbar username={userInfo.username} searchBarSubmit={searchBarSubmit}/>
      <div className='user-dashboard'>
        <div className='game-collection-section'>
          <h1>My Games</h1>
          {loading && <h2>LOADING</h2>}
          {data && <h2>GOT SOME DATA</h2>}
          {error && <h2>OH NO ERROR: {error.message}</h2>}
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
