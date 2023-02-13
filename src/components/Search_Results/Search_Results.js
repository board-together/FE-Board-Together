import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import SingleGame from '../Single_Game/Single_Game'
import { useQuery } from "@apollo/client"
import { GET_SEARCHED_GAMES } from '../../GraphQL/queries'

const SearchResults = ({ results, searchBarSubmit, userInfo, setModal }) => {
  const { loading, data, error } = useQuery(GET_SEARCHED_GAMES(results));
  console.log(data, error)


  if (loading) {
    return <h1>loading...</h1>
  }
  const games = data ? data.searchGames.map(game => <SingleGame game={game} key={game.name} setModal={setModal} />) : []
  return (
    <div>
      <Navbar searchBarSubmit={searchBarSubmit} ></Navbar>
      <Link to={`/dashboard/`}><button>Back to dashboard</button></Link>
      <div className='game-tiles'>
        {!games.length ? <h1>No results matching that name were found.</h1> : games}
      </div>
    </div>
  )
}

export default SearchResults
