import React from 'react'
import './Game_Modal.css'
import { useQuery } from "@apollo/client"

export const GameModal = ({ setModal, deleteGame, context, modal, userInfo, updateUser, addGamesInput }) => {

console.log('this is the modal', modal)

  //Lines 6 through 11 are only for cleaning up the dummy data that (specifically the game description)
  //I think matches what we will get from the server. If not, this code can be deleted.


  if (context === 'searched_games') {
    let array = ['<p>', '</p>', '<em>', '</em>', '<br>', '<br />', '<strong>', '</strong>']
    let string = modal.description
    array.forEach(val => {
      string = string.replaceAll(val, '')
    })
    let averagePlayTime = (modal.minPlaytime + modal.maxPlaytime) / 2

    return (
      <div className='modal-container'>
        <div className='game-modal'>
          <span className='close-modal-button-container'>
            <button className='close-modal-button' onClick={() => setModal()}>X</button>
          </span>
          <span className='modal-header'>
            <h1>{modal.name}</h1><p>({modal.yearPublished})</p>
          </span>
          <div className='modal-content'>
            <img className='modal-image' alt={`Box Cover of ${modal.name}`} src={modal.imageUrl} />
            <div className='modal-details'>
              <p>Players: {modal.minPlayers} to {modal.maxPlayers}</p>
              <p>Average Playtime: {averagePlayTime} minutes</p>
              <p>Age: {modal.minAge}+</p>
              <p>{string}</p>
              <a href={modal.url} target='_blank' rel="noreferrer">More Info</a>
            </div>
          </div>
          <div className='modal-buttons'>
            <button className='modal-button'>Add to Collection</button>
          </div>
        </div>
      </div>
    )
  }

  let array = ['<p>', '</p>', '<em>', '</em>', '<br>', '<br />', '<strong>', '</strong>']
  let string = modal.game.description
  array.forEach(val => {
    string = string.replaceAll(val, '')
  })
  let averagePlayTime = (modal.game.minPlaytime + modal.game.maxPlaytime) / 2
  return (
    <div className='modal-container'>
      <div className='game-modal'>
        <span className='close-modal-button-container'>
          <button className='close-modal-button' onClick={() => setModal()}>X</button>
        </span>
        <span className='modal-header'>
          <h1>{modal.game.name}</h1><p>({modal.game.yearPublished})</p>
        </span>
        <div className='modal-content'>
          <img className='modal-image' alt={`Box Cover of ${modal.game.name || modal.game}`} src={modal.game.imageUrl} />
          <div className='modal-details'>
            <p>Players: {modal.game.minPlayers} to {modal.game.maxPlayers}</p>
            <p>Average Playtime: {averagePlayTime} minutes</p>
            <p>Age: {modal.game.minAge}+</p>
            <p>{string}</p>
            <a href={modal.game.url} target='_blank' rel="noreferrer">More Info</a>
          </div>
        </div>
        <div className='modal-buttons'>
          {(context === 'user_dashboard' && modal.borrowerId) && <button className='modal-button'>Return</button>}
          {(context === 'user_dashboard' && !modal.borrowerId) && <button className='modal-button delete-button' onClick={() => deleteGame(+modal.game.id)}>Delete</button>}
          {(context === 'user_dashboard' && !modal.borrowerId) && <button className='modal-button'>Make Private</button>}
          {context === 'searched_games' && <button className='modal-button'>Add to Collection</button>}
          {context === 'friends_games' && <button className='modal-button'>Borrow</button>}
        </div>
      </div>
    </div>
  )
}
