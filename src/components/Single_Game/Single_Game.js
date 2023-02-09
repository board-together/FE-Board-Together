import React from "react"
import './Single_Game.css'


const SingleGame = ({ game }) => {
  return (
    <div className="single-tile" id={game.id}>
      <h2 className="single-game-name">{game.attributes.name}</h2>
      <img className="single-game-img" src={game.attributes.image_url} alt={game.attributes.name} />
    </div>
  )
}

export default SingleGame