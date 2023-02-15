import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import { GameModal } from '../Game_Modal/Game_Modal'
import SingleGame from '../Single_Game/Single_Game'
import './User_Dashboard.css'
import { GET_ALL_USERS } from '../../GraphQL/queries'
import { useQuery } from '@apollo/client'



export const UserDashboard = ({ userInfo, searchBarSubmit, deleteGame, setModal, modal, loading, error, data, userName, refetchUser }) => {

  const allUsersLoading = useQuery(GET_ALL_USERS).loading
  const allUsersError = useQuery(GET_ALL_USERS).error
  const allUsersData = useQuery(GET_ALL_USERS).data
  const friendsList = allUsersData && userInfo ? allUsersData.users.filter(user => user.username !== userInfo.username) : []
  const smile = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
  const friends = friendsList.map(friend => {
    return (<Link to={`/friends-games/${friend.username}`} key={friend.id}>
      <p key={friend.id} className="friend">{smile}{friend.username}</p>
    </Link>)
  })


  const games = userInfo ? userInfo.userGames.map((game, index) => <SingleGame key={index} game={game} setModal={setModal} userGames={userInfo.userGames} userInfo={userInfo} context={'userGames'} />) : []
  const borrowedGames = userInfo ? userInfo.borrowedGames.map((game, index) => <SingleGame key={index} game={game} setModal={setModal} userGames={userInfo.userGames} context={'borrowedGames'} />) : []


  return (
    <>
      {modal && <GameModal setModal={setModal} deleteGame={deleteGame} context={'user_dashboard'} modal={modal} userInfo={userInfo} refetchUser={refetchUser} />}
      <Navbar username={userName} searchBarSubmit={searchBarSubmit} />
      <div className='user-dashboard'>
        {error && <h1>Error loading data: {error.message}</h1>}
        {loading && <h1>Loading...</h1>}
        {data && <>
          <div className='game-collection-section'>
            <h2>Games I'm Borrowing</h2>
            <div className='borrowed-games-collection'>{borrowedGames}</div>
            <h2>My Game Collection</h2>
            <div className='game-collection'>{games}</div>
          </div>
          <div className='friends-section'>
            <h1 className='my-friends-header'>My Friends</h1>
            {allUsersLoading && <h2>Loading friends...</h2>}
            {allUsersError && <h2>Trouble loading friends!</h2>}
            {allUsersData && <div className='friends-list'></div>}
            <div className='friends-list'>{friends}</div>
          </div>
        </>}
      </div>
    </>
  )
}
