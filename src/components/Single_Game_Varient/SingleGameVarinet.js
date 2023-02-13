import React from "react"
import './Single_Game_Varient.css'


const SingleGameVarient = ({ game }) => {
console.log('this is game on single game varient', game)
  return (
    <>
      
        <div className="single-tile-v"  >
          <h2 className="single-game-name-v">{game.name}</h2>
          <img className="single-game-img-v" src={game.imageUrl} alt={game.name} />
        </div>
    
    </>
  )
}

export default SingleGameVarient