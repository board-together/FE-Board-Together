import React from "react"
import './Single_Game.css'


const SingleGame = ({ game, setModal }) => {
  return (
    <div className="single-tile" id={+game.game.id} onClick={() => setModal(+game.game.id)}>
      <h2 className="single-game-name">{game.game.name}</h2>
      <img className="single-game-img" src={game.game.imageUrl} alt={game.game.name} />
    </div>
  )
}

export default SingleGame