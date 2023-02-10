import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import SingleGame from '../Single_Game/Single_Game'

const SearchResults = ({ results, searchBarSubmit, userInfo }) => {
  const games = results.map(game => <SingleGame game={game} key={game.id}/>)
 

  return (
  <div>
      <Navbar searchBarSubmit={searchBarSubmit} ></Navbar>
      <Link to={`/dashboard/${userInfo.username}`}><button>Back to dashboard</button></Link>
    <div className='game-tiles'>
      {!games.length && <h1>No results matching that name were found.</h1>}
      {games}
    </div>
  </div>
  )
}

export default SearchResults
