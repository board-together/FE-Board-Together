import React from "react"
import './Single_Game_Varient.css'


const SingleGameVarient = ({ game, setModal }) => {

  return (
    <>
      <div className="single-tile-v" onClick={() => setModal(game)}>
        <h2 className={`game-name-${game.name}`}>{game.name}</h2>
        <img className="single-game-img-v" src={game.imageUrl} alt={game.name} />
      </div>
    </>
  )
}

export default SingleGameVarient