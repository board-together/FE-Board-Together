import React from 'react'
import './Game_Modal.css'

export const GameModal = ({ setModal, context, modal }) => {
  return (
    <div className='modal-container'>
      <div className='game-modal'>
        <h1>Game Modal</h1>
        <button onClick={() => setModal()}>CLOSE</button>
        {context === 'user_dashboard' && <button>Delete</button>}
        {context === 'user_dashboard' && <button>Make Private</button>}
        {context === 'search' && <button>Add to Collection</button>}
        {context === 'friends_games' && <button>Borrow</button>}
        <p>Players: {modal.attributes.min_players} to {modal.attributes.max_players}</p>
      </div>
    </div>
  )
}
