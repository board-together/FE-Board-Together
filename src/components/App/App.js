import React, { useReducer, useEffect, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserDashboard } from '../User_Dashboard/User_Dashboard'
import { Login } from '../Login/Login'
import SearchResults from '../Search_Results/Search_Results'
import { FriendsGames } from '../Friends_Games/Friends_Games'
import { GET_USER, GET_ALL_USERS } from '../../GraphQL/queries'
import { useQuery } from "@apollo/client"
import games from '../../dummy-borrowed-games.json'
import { fetchSearchedGames } from '../../apiCalls'

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
      return { ...state, user: action.payload.user, friendsList: action.payload.friends, loading: false }
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
  const { loading, error, data } = useQuery(GET_USER(state.userName))
  const friendsData = useQuery(GET_ALL_USERS())
  // const [mutation] = useMutation(CREATE_USER('CoolGuy1975'), {
  //   onCompleted: (data) => {
  //     console.log(data)
  //   }
  // })
  //const [GET_USER, { data, loading, error }] = useMutation(GET_USER("argdfga"));

  useEffect(() => {
    if (error) {
      dispatch({ type: 'error', payload: error })
    }
    if (data) {
      dispatch({ type: 'success', payload: {user: data.user, friends: friendsData.data.users }})
    }
  }, [data, loading, error, friendsData])

  const searchBarSubmit = (terms) => {
    let returnArray = []
    games.forEach(element => {
      console.log(element)
      let name = element.attributes.name.toLowerCase()
      if (name.includes(terms.toLowerCase())) {
        returnArray.push(element)
      }
    })
    dispatch({
      type: 'search_result',
      payload: returnArray
    })
  }

  const setUserName = useCallback((userName) => {
    dispatch({
      type: 'set_userName',
      payload: userName
    })
  }, [])

  const setModal = (id = null) => {
    if (id) {
      const modalInfo = state.user.games.find(game => game.id === id)
      dispatch({ type: 'set_modal', payload: modalInfo })
    } else {
      dispatch({ type: 'set_modal' })
    }
  }

  const deleteGame = (id) => {
    const filteredGames = state.user.games.filter(game => game.id !== id)
    dispatch({ type: 'delete_game', payload: filteredGames })
  }

  console.log(state.user)
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
              loading={state.loading}
              error={error}
              data={data}
              userName={state.userName}
              friends={state.friendsList}
            />
          } />
        <Route path='/search-results/:searchTerm' element={<SearchResults results={state.searchResults} userInfo={state.user} searchBarSubmit={searchBarSubmit} />} />
        <Route path='/friends-games/:id' element={<FriendsGames />} />
      </Routes>
    </div>
  )
}
