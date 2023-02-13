import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import { useQuery } from "@apollo/client"
import { GET_SEARCHED_GAMES } from '../../GraphQL/queries'
import SingleGameVarient from '../Single_Game_Varient/SingleGameVarinet'
import './Search_Results.css'

const SearchResults = ({ results, searchBarSubmit }) => {
  const { loading, data, error } = useQuery(GET_SEARCHED_GAMES(results));

  if(error){
    return <h1>{error}</h1>
  }

  if (loading) {
    return <h1>loading...</h1>
  }
  const games = data ? data.searchGames.map(game => <SingleGameVarient game={game} key={game.name}  />) : []
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
