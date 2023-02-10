import React from "react"
import './Single_Game.css'


const SingleGame = ({ game }) => {
  return (
    <div className="single-tile" id={`game-${game.id}`} key={game.id} >
      <h2 className="single-game-name" id={`game-name-${game.id}`}>{game.attributes.name}</h2>
      <img className="single-game-img" src={game.attributes.image_url} alt={game.attributes.name} />
    </div>
  )
}

export default SingleGame