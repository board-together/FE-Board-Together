import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import { GameModal } from '../Game_Modal/Game_Modal'
import SingleGame from '../Single_Game/Single_Game'
import './User_Dashboard.css'
import { GET_ALL_USERS } from '../../GraphQL/queries'
import { useQuery } from '@apollo/client'
import smile from '../../assets/face-smile-regular.svg'



export const UserDashboard = ({ userInfo, searchBarSubmit, deleteGame, setModal, modal, loading, error, data, userName, refetchUser }) => {

  const [toggleFocus, setToggleFocus] = useState(true)

  const allUsersLoading = useQuery(GET_ALL_USERS).loading
  const allUsersError = useQuery(GET_ALL_USERS).error
  const allUsersData = useQuery(GET_ALL_USERS).data
  const friendsList = allUsersData && userInfo ? allUsersData.users.filter(user => user.username !== userInfo.username) : []
  const smileImg = <img src={smile} alt='smile svg' className='smile-svg' />
  const friends = friendsList.map(friend => {
    return (<Link to={`/friends-games/${friend.username}`} key={friend.id}>
      <span key={friend.id} className="friend">{smileImg}<p className='friend-name'>{friend.username}</p></span>
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
            <div className='game-collection-headers'>
              <h2 className={`my-games-header ${toggleFocus && 'header-focus'}`} onClick={() => setToggleFocus(!toggleFocus ? true : false)}>My Games</h2>
              <h2 className={`borrowed-header ${!toggleFocus && 'header-focus'}`} onClick={() => setToggleFocus(toggleFocus ? false : true)}>Borrowed</h2>
            </div>
            {toggleFocus && <div className='game-collection'>{games}</div>}
            {!toggleFocus && <div className='borrowed-games-collection'>{borrowedGames}</div>}
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
