import React, { useEffect } from 'react'
import './Game_Modal.css'
import { useMutation } from "@apollo/client"
import { ADD_GAME_TO_COLLECTION } from '../../GraphQL/mutations'
import { UPDATE_USERGAME } from '../../GraphQL/mutations'


export const GameModal = ({ setModal, deleteGame, context, modal, userInfo, refetchFriend, refetchUser, addGamesInput }) => {
  const [addGame, { loading, data, error }] = useMutation(ADD_GAME_TO_COLLECTION);
  if(loading) {
    <h1>Loadin...</h1>
  }
  if(data){
    console.log(data)
  }
  if(error) {
    console.log(error)
  }
    const inputVar = userInfo ? addGamesInput(modal, +userInfo.id) : null     
    
const clickHelper = () => {
  addGame({ variables: { input: inputVar } })
  setTimeout(() => {
   setModal()
  }, "1000")
}
  
  const borrowObject = userInfo ? {
    id: +modal.id,
    borrowerId: +userInfo.id,
    status: 1
  } : '';

  const returnObject = userInfo ? {
    id: +modal.id,
    borrowerId: null,
    status: 0
  } : '';

  const [updateUserGame, {data}] = useMutation(UPDATE_USERGAME)
  const updateUserMutation = useMutation(UPDATE_USERGAME)
  const updateUserGame = updateUserMutation[0]
  const updateUserData = updateUserMutation[1].data
  
  useEffect(() => {
    if (updateUserData) {
      refetchUser();
      if (refetchFriend) refetchFriend();
    }
  }, [updateUserData, refetchFriend, refetchUser]) //wrap in a use callback??
  
  const borrowFriendsGame = (event) => {
    event.preventDefault();
    updateUserGame({ variables: { input: borrowObject } });
  }

  const returnFriendsGame = (event) => {
    event.preventDefault();
    updateUserGame({ variables: { input: returnObject } });
  }





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
           <button className='modal-button' onClick={ () => clickHelper()} >Add to Collection</button>
           
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
          {(context === 'user_dashboard' && modal.borrowerId) && <button className='modal-button' onClick={event => returnFriendsGame(event)}>Return</button>}
          {(context === 'user_dashboard' && !modal.borrowerId) && <button className='modal-button delete-button' onClick={() => deleteGame(+modal.game.id)}>Delete</button>}
          {(context === 'user_dashboard' && !modal.borrowerId) && <button className='modal-button'>Make Private</button>}
          {context === 'searched_games' && <button className='modal-button'>Add to Collection</button>}
          {context === 'friends_games' && <button className='modal-button' onClick={event => borrowFriendsGame(event)}>Borrow</button>}
        </div>
      </div>
    </div>
  )
}
