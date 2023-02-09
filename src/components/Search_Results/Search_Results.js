import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import SingleGame from '../Single_Game/Single_Game'

const SearchResults = ({ results, searchBarSubmit }) => {
  const games = results.map(game => <SingleGame game={game} />)

  return (
  <div>
    <Navbar searchBarSubmit={searchBarSubmit} ></Navbar>
    <div className='game-tiles'>
      {!games.length && <h1>No results matching that name were found.</h1>}
      {games}
    </div>
  </div>
  )
}

export default SearchResults
