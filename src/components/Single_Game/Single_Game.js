import React from "react"
import './Single_Game.css'


const SingleGame = ({ game, setModal, userGames }) => {

  const checkIfLentOut = userGames ? 
    userGames.filter(myGame => +myGame.gameId === game.gameId).map(item => item.gameId).includes(game.gameId) && game.borrowerId
    : false
// console.log('check if lent out: ', checkIfLentOut);
  return (
    <>
      {checkIfLentOut && 
        <div className="single-tile" id={+game.game.id} onClick={() => setModal(+game.game.id)}>
          <h2 className="single-borrowed-game-name">{game.game.name}</h2>
          <div className="single-borrowed-game">
            <img className="single-game-img" src={game.game.imageUrl} alt={game.game.name} />
          </div>
        </div>
      }
      {!checkIfLentOut && 
        <div className="single-tile" id={+game.game.id} onClick={() => setModal(+game.game.id)}>
          <h2 className="single-game-name">{game.game.name}</h2>
          <img className="single-game-img" src={game.game.imageUrl} alt={game.game.name} />
        </div>
      }
    </>
  )
}

export default SingleGame