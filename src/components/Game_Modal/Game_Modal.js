import React from 'react'
import './Game_Modal.css'

export const GameModal = ({ setModal }) => {
  return (
    <div className='modal-container'>
      <div className='game-modal'>
        <h1>Game Modal</h1>
        <button onClick={setModal}>CLOSE</button>
      </div>
    </div>
  )
}
