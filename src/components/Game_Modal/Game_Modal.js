import React, { useEffect } from 'react'
import { cleanGameDescription } from '../../utils'
import { DELETE_GAME } from '../../GraphQL/mutations
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

  const deleteGameInfo = useMutation(DELETE_GAME)
  const deleteGame = deleteGameInfo[0]
  const deleteGameData = deleteGameInfo[1].data

  let averagePlayTime
  let description

  useEffect(() => {
    if (deleteGameData) {
      refetchUser();
    }
  }, [deleteGameData, refetchUser])

  if (context === 'searched_games') {
    description = cleanGameDescription(modal.description)
    averagePlayTime = (modal.minPlaytime + modal.maxPlaytime) / 2
  } else {
    description = cleanGameDescription(modal.game.description)
    averagePlayTime = (modal.game.minPlaytime + modal.game.maxPlaytime) / 2
  }

  return (
    <div className='modal-container'>
      <div className='game-modal'>
        <span className='close-modal-button-container'>
          <button className='close-modal-button' onClick={() => setModal()}>X</button>
        </span>
        <span className='modal-header'>
          <h1>{modal.name || modal.game.name}</h1><p>({modal.yearPublished || modal.game.yearPublished})</p>
        </span>
        <div className='modal-content'>
          <img className='modal-image' alt={`Box Cover of ${modal.name || modal.game.name}`} src={modal.imageUrl || modal.game.imageUrl} />
          <div className='modal-details'>
            <p>Players: {modal.minPlayers || modal.game.minPlayers} to {modal.maxPlayers || modal.game.maxPlayers}</p>
            <p>Average Playtime: {averagePlayTime} minutes</p>
            <p>Age: {modal.minAge || modal.game.minAge}+</p>
            <p>{description}</p>
            <a href={modal.url || modal.game.url} target='_blank' rel="noreferrer">More Info</a>
          </div>
        </div>
        <div className='modal-buttons'>
          {(context === 'user_dashboard' && modal.borrowerId)
            && <button className='modal-button' onClick={event => returnFriendsGame(event)}>Return Friend's Game</button>}
          {(context === 'user_dashboard' && !modal.borrowerId)
            && <button className='modal-button delete-button'
              onClick={() => {
                deleteGame({ variables: { input: { id: +modal.id } } })
                setModal()
                refetchUser()
              }}>Delete</button>}
          {(context === 'user_dashboard' && !modal.borrowerId)
            && <button className='modal-button'>Make Private</button>}
          {context === 'searched_games'
            && <button className='modal-button' onClick={ () => clickHelper()} >Add to Collection</button>}
          {context === 'friends_games'
            && <button className='modal-button' onClick={event => borrowFriendsGame(event)}>Borrow</button>}
        </div>
      </div>
    </div>
  )
}