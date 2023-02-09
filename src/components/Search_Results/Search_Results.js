import React from 'react'
import SingleGame from '../Single_Game/Single_Game'

const SearchResults = ({ results }) => {
  const games = results.map(game => <SingleGame game={game} />)

  return (
    <div className='game-tiles'>
      {!games.length && <h1>No results matching that name were found.</h1>}
      {games}
    </div>
  )
}

export default SearchResults
