import { useQuery } from "@apollo/client"
import React from "react"
import { GET_ALL_USERS } from '../../GraphQL/queries'
import './Single_Game.css'


const SingleGame = ({ game, setModal, userGames }) => {

  const checkIfLentOut = userGames ? 
    userGames.filter(myGame => +myGame.gameId === game.gameId).map(item => item.gameId).includes(game.gameId) && game.borrowerId
    : false

  const { loading, data } = useQuery(GET_ALL_USERS)
  const borrower = data && checkIfLentOut ? data.users.find(user => +user.id === +game.borrowerId).username : ''

  return (
    <>
      {checkIfLentOut && 
        <div className="single-tile" id={+game.game.id} onClick={() => setModal(game)}>
          <h2 className="single-borrowed-game-name">{game.game.name}</h2>
          <div className="single-borrowed-game">
            <img className="single-game-img" src={game.game.imageUrl} alt={game.game.name} />
          </div>
          {loading && <p>loading</p>}
          {data && <p>Borrowed by {`${borrower}`}</p>}
          
        </div>
      }
      {!checkIfLentOut && 
        <div className="single-tile" id={+game.game.id} onClick={() => setModal(game)}>
          <h2 className="single-game-name">{game.game.name}</h2>
          <img className="single-game-img" src={game.game.imageUrl} alt={game.game.name} />
        </div>
      }
    </>
  )
}

export default SingleGame