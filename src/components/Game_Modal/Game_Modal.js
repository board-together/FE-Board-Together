import React from 'react'
import './Game_Modal.css'

export const GameModal = ({ setModal, deleteGame, context, modal }) => {

  let averagePlayTime = (modal.attributes.min_playtime + modal.attributes.max_playtime) / 2

  //Lines 6 through 11 are only for cleaning up the dummy data that (specifically the game description)
  //I think matches what we will get from the server. If not, this code can be deleted.
  let array = ['<p>', '</p>', '<em>', '</em>', '<br>', '<br />', '<strong>', '</strong>']
  let string = modal.attributes.description
  array.forEach(val => {
    string = string.replaceAll(val, '')
  })

  return (
    <div className='modal-container'>
      <div className='game-modal'>
        <span className='close-modal-button-container'>
          <button className='close-modal-button' onClick={() => setModal()}>X</button>
        </span>
        <span className='modal-header'>
          <h1>{modal.attributes.name}</h1><p>({modal.attributes.year_published})</p>
        </span>
        <div className='modal-content'>
          <img className='modal-image' alt={`Box Cover of ${modal.attributes.name}`} src={modal.attributes.image_url} />
          <div className='modal-details'>
            <p>Players: {modal.attributes.min_players} to {modal.attributes.max_players}</p>
            <p>Average Playtime: {averagePlayTime} minutes</p>
            <p>Age: {modal.attributes.min_age}+</p>
            <p>{string}</p>
            <a href={modal.attributes.url} target='_blank' rel="noreferrer">More Info</a>
          </div>
        </div>
        <div className='modal-buttons'>
          {context === 'user_dashboard' && <button className='modal-button delete-button' onClick={() => deleteGame(modal.id)}>Delete</button>}
          {context === 'user_dashboard' && <button className='modal-button'>Make Private</button>}
          {context === 'search' && <button className='modal-button'>Add to Collection</button>}
          {context === 'friends_games' && <button className='modal-button'>Borrow</button>}
        </div>
      </div>
    </div>
  )
}
