import React, { useReducer, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserDashboard } from '../User_Dashboard/User_Dashboard'
import { Login } from '../Login/Login'
import { SearchResults } from '../Search_Results/Search_Results'
import { FriendsGames } from '../Friends_Games/Friends_Games'
import { Navbar } from '../Navbar/Navbar'
import dummyData from '../../dummy_user_data.json'

export const App = () => {

  const [userInfo, setUserInfo] = useState(dummyData.json())

  return (
    <div className='App'>

      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<UserDashboard userInfo={userInfo} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search-results/:searchTerm' element={<SearchResults />} />
        <Route path='/friends-games/:id' element={<FriendsGames />} />
      </Routes>
    </div>
  )
}
