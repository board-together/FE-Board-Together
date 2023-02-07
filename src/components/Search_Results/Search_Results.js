import React from 'react'
import  Single_Game  from '../Single_Game/Single_Game'



 


const SearchResults = ({results}) => {
    const singleGames = results.map(game => {
     
      return (
        <Single_Game
          id={game.id}
          key={game.id}
          name={game.attributes.name}
          thumb_url={game.attributes.thumb_url}
          image_url={game.attributes.image_url}
        />
      )
    })
   
  return (
    <div className='game-tiles'>
      {singleGames}
    </div>
  )
  }

  export default SearchResults;
