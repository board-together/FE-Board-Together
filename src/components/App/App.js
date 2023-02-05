import React from 'react'
import { Routes, Route } from 'react-router-dom'
import User_Dashboard from '../User_Dashboard/User_Dashboard'
import Login from '../Login/Login'
import Search_Results from '../Search_Results/Search_Results'
import Friends_Games from '../Friends_Games/Friends_Games'

export const App = () => {

  return (
    <Routes>
      <Route path='/' element={<User_Dashboard />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/search-result/:searchTerm' element={<Search_Results />}/>
      <Route path='/friends-games/:id' element={<Friends_Games />}/>
    </Routes>
  )
}
