
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
  // const [mutation] = useMutation(CREATE_USER('CoolGuy1975'), {
  //   onCompleted: (data) => {
  //     console.log(data)
  //   }
  // })
  // const [GET_USER, { data, loading, error }] = useMutation(GET_USER("argdfga"));

  useEffect(() => {
    if (error) {
      console.log('ERROR: ', error.message);
      dispatch({ type: 'error', payload: error })
    }
    if (data) {
      console.log('success');
      dispatch({ type: 'success', payload: data.user })
    }
  }, [data, loading, error])

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

  const setModal = (id = null) => {
    if (id) {
      const modalInfo = state.user.userGames.find(game => +game.game.id === id)
      //NOTE: modal does not work for borrowed games right now because borrowed games are coming from mock data, should be in same array once BE is set up.
      dispatch({ type: 'set_modal', payload: modalInfo })
    } else {
      dispatch({ type: 'set_modal' })
    }
  }

  const deleteGame = (id) => {
    const filteredGames = state.user.games.filter(game => game.id !== id)
    dispatch({ type: 'delete_game', payload: filteredGames })
  }

    return (
      <div className='App'>
        <Routes>
          <Route path='/' element={<Login setUserName={setUserName}/>} />
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
                userName={state.userName}
              />
            } />
          <Route path='/search-results/:searchTerm' element={<SearchResults results={state.searchResults} userInfo={state.user} searchBarSubmit={searchBarSubmit} setModal={setModal}/> } /> 
          <Route path='/friends-games/:id' element={<FriendsGames userInfo={state.user} searchBarSubmit={searchBarSubmit} />} />
        </Routes>
      </div>
    )
}
