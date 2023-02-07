import React from 'react'
import  SingleGame  from '../Single_Game/Single_Game'



 


const SearchResults = ({results}) => {
    const games = results.map(game => {
     
      return (
        <SingleGame
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
      {games}
    </div>
  )
  }

  export default SearchResults;
