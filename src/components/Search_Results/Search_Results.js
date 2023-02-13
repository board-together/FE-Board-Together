import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import { GameModal } from '../Game_Modal/Game_Modal'
import SingleGame from '../Single_Game/Single_Game'

const SearchResults = ({ results, searchBarSubmit, userInfo, setModal, modal }) => {
  console.log(results)
  const games = results.map(game => <SingleGame game={game} key={game.id} setModal={setModal} />)

  return (
    <>
      {modal && <GameModal setModal={setModal} context={'searched_games'} modal={modal} />}
      <div>
        <Navbar searchBarSubmit={searchBarSubmit} ></Navbar>
        <Link to={`/dashboard/${userInfo.username}`}><button>Back to dashboard</button></Link>
        <div className='game-tiles'>
          {!games.length && <h1>No results matching that name were found.</h1>}
          {games}
        </div>
      </div>
    </>
  )
}

export default SearchResults
