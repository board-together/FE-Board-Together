import React from "react";
import './Single_Game.css'


const SingleGame = ({id,name,thumb_url,image_url}) => {
  return (
    <div className="single-tile">
      <button className="game-tile-button" id={id} ><h2 className="single-game-name">{name}</h2> <img className="single-game-img" src={image_url} alt={name}/> </button>  
    </div>
  )
}
 
export default SingleGame;