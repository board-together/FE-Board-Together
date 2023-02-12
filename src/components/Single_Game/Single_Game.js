import React from "react"
import './Single_Game.css'

/*
  Game object being passed in will need a boolean of whether borrowed is true or not;
  If it is borrowed AND it is in User's games, it will conditionally render as greyed out;
  If it is NOT borrowed, it will render as below
*/

const SingleGame = ({ game, setModal }) => {
  return (
    <div className="single-tile" id={game.game.id} onClick={() => setModal(game.game.id)}>
      <h2 className="single-game-name">{game.game.name}</h2>
      <img className="single-game-img" src={game.game.imageUrl} alt={game.game.name} />
    </div>
  )
}

export default SingleGame