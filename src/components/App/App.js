import React, {useReducer} from 'react'
import fakeData from  '../../dummy_data.json'
import { Routes, Route } from 'react-router-dom'
import { UserDashboard } from '../User_Dashboard/User_Dashboard'
import { Login } from '../Login/Login'
import { SearchResults } from '../Search_Results/Search_Results'
import { FriendsGames } from '../Friends_Games/Friends_Games'
import dummyData from '../../dummy_user_data.json'

const initialState = {
  searchResults : [],
  user: {},
  userName: '',
  friendsList: [],
  gameCollection: [],
  modalOpen: false,
  error: null,
  loading:false
}

const reducer = (state, action) => {
    switch(action.type) {
      case 'search_result': {
        return {...state, searchResults: action.payload}   
      }
      default:
      return state
    }
}



export const App = () => {
  const [state, dispatch] = useReducer(reducer,initialState)
  const searchBarSubmit = (terms) => {
     dispatch({
      type: 'search_result',
      payload: fakeData.json()
     })
  }

  const userInfo = dummyData


  return (

    <div className='App'>
      <Routes>
        <Route path='/' element={<UserDashboard userInfo={userInfo} searchBarSubmit={searchBarSubmit}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/search-results/:searchTerm' element={<SearchResults results={state.searchResults}/>} />
        <Route path='/friends-games/:id' element={<FriendsGames />} />
      </Routes>
    </div>

  )
}
