import React from "react";
import './Single_Game.css'


const Single_Game = ({id,name,thumb_url,image_url}) => {
  return (
    <div className="single-tile">
      <button className="game-tile-button" id={id} ><h2 className="single-game-name">{name}</h2> <img className="single-game-img" src={image_url}/> </button>  
    </div>
  )
}
 
export default Single_Game;