
import React, { useReducer, useEffect, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserDashboard } from '../User_Dashboard/User_Dashboard'
import { Login } from '../Login/Login'
import SearchResults from '../Search_Results/Search_Results'
import { FriendsGames } from '../Friends_Games/Friends_Games'
import { GET_USER } from '../../GraphQL/queries'
import { useQuery } from "@apollo/client"





const initialState = {
  searchResults: [],
  user: null,
  userName: '',
  friendsList: [],
  gameCollection: [],
  modal: null,
  error: null,
  loading: true
}

const reducer = (state, action) => {
  switch (action.type) {
    case "success": {
      return { ...state, user: action.payload, loading: false }
    }
    case "error": {
      return { ...state, error: action.payload, loading: false }
    }
    case 'search_result': {
      return { ...state, searchResults: action.payload }
    }
    case 'set_userName': {
      return { ...state, userName: action.payload }
    }
    case 'set_modal': {
      return { ...state, modal: action.payload ? action.payload : null }
    }
    case 'delete_game': {
      const userCopy = state.user
      userCopy.games = action.payload
      return { ...state, user: userCopy, modal: null }
    }
    default:
      return state
  }
}

export const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  const { loading, error, data } = useQuery(GET_USER(localStorage.getItem('username')))


  useEffect(() => {
    if (error) {
      console.log('ERROR: ', error.message)
      dispatch({ type: 'error', payload: error })
    }
    if (data) {
      dispatch({ type: 'success', payload: data.user })
    }
  }, [data, loading, error]);

  const updateUser = (userObject) => {
    dispatch({ type: 'success', payload: userObject })
  }

  const searchBarSubmit = (terms) => {
   
    dispatch({
      type: 'search_result',
      payload: terms
    })
  }

  const setUserName = useCallback((userName) => {
    localStorage.setItem('username', `${userName}`);
    dispatch({
      type: 'set_userName',
      payload: localStorage.getItem('username')
    });
  }, []);

  const setModal = (game = null) => {
   
    if (game) {
      dispatch({ type: 'set_modal', payload: game })
    } else {
      dispatch({ type: 'set_modal' })
    }
  }

const modalFormatForMute = (modal,Id) => {
  const readyForMute =  { 
    userId: Id,
    boardGameAtlasId: modal.boardGameAtlasId,
    url: modal.url,
    name: modal.name,
    yearPublished: String(modal.yearPublished),
    minPlayers: String(modal.minPlayers),
    maxPlayers: String(modal.maxPlayers),
    minPlaytime: String(modal.minPlaytime),
    maxPlaytime: String(modal.maxPlaytime),
    minAge: String(modal.minAge),
    description: modal.description,
    thumbUrl: String(modal.thumbUrl),
    imageUrl: String(modal.imageUrl)
  }
  console.log(readyForMute)
  return readyForMute
}

  const deleteGame = (id) => {
    const filteredGames = state.user.games.filter(game => game.id !== id)
    dispatch({ type: 'delete_game', payload: filteredGames })
  }


  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login setUserName={setUserName} />} />
        <Route path='/dashboard/'
          element={
            <UserDashboard
              userInfo={state.user}
              searchBarSubmit={searchBarSubmit}
              setModal={setModal}
              modal={state.modal}
              deleteGame={deleteGame}
              loading={loading}
              error={error}
              data={data}
              userName={localStorage.getItem('username')}
            />
          } />
        <Route path='/search-results/:searchTerm'
          element={
            <SearchResults
              results={state.searchResults}
              userInfo={state.user}
              searchBarSubmit={searchBarSubmit}
              setModal={setModal}
              modal={state.modal}
              userName={localStorage.getItem('username')}
              updateUser={updateUser}
              addGamesInput={modalFormatForMute}
            />
          } />
        <Route path='/friends-games/:id'
          element={
            <FriendsGames
              searchBarSubmit={searchBarSubmit}
              setModal={setModal}
              modal={state.modal}
              userName={localStorage.getItem('username')}
            />
          } />
      </Routes>
    </div>
  )

  
}
