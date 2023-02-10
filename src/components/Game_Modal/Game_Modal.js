import React from 'react'
import './Game_Modal.css'

export const GameModal = ({ setModal, context, modal }) => {
  let averagePlayTime = (modal.attributes.min_playtime + modal.attributes.max_playtime) / 2
  let array = ['<p>', '</p>', '<em>', '</em>', '<br>', '<br />', '<strong>', '</strong>']
  let string = modal.attributes.description
  array.forEach(val => {
    string = string.replaceAll(val, '')
  })
  return (
    <div className='modal-container'>
      <div className='game-modal'>
        <span className='modal-header'>
          <h1>{modal.attributes.name}</h1><p>({modal.attributes.year_published})</p>
        </span>
        <p>Players: {modal.attributes.min_players} to {modal.attributes.max_players}</p>
        <p>Average Playtime: {averagePlayTime}</p>
        <p>Age: {modal.attributes.min_age}+</p>
        <img alt={`Box Cover of ${modal.attributes.name}`} src={modal.attributes.image_url} />
        {string}
        <a href={modal.attributes.url}>More Info</a>
        <button onClick={() => setModal()}>CLOSE</button>
        {context === 'user_dashboard' && <button>Delete</button>}
        {context === 'user_dashboard' && <button>Make Private</button>}
        {context === 'search' && <button>Add to Collection</button>}
        {context === 'friends_games' && <button>Borrow</button>}
      </div>
    </div>
  )
}
