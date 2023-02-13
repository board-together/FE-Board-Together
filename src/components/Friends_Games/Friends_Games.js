import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import SingleGame from '../Single_Game/Single_Game'
import { Navbar } from '../Navbar/Navbar'
import { GET_USER } from '../../GraphQL/queries'
import '../Friends_Games/Friends_Games.css'
import { useQuery } from '@apollo/client'



export const FriendsGames = ({searchBarSubmit, userInfo}) => {
  const friendName = useParams().id;
  const [friendsGames, setFriendsGames] = useState([]);
  const { loading, error, data } = useQuery(GET_USER(friendName));

  useEffect(() => {
    if (data) {
      setFriendsGames(data.user.userGames.filter(game => !game.borrowerId))
      console.log('friends games state: ', friendsGames);
    } else {
      setFriendsGames([]);
    }
  }, [data]);

  const friendsGameThumbnails = friendsGames.map((game, index) => <SingleGame key={index}  game={game} />)

  return (
    <div>
      <Navbar searchBarSubmit={searchBarSubmit}></Navbar>
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
  )
}
