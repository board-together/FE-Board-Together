import React, {useReducer} from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserDashboard } from '../User_Dashboard/User_Dashboard'
import { Login } from '../Login/Login'
import  SearchResults  from '../Search_Results/Search_Results'
import { FriendsGames } from '../Friends_Games/Friends_Games'
import { Navbar } from '../Navbar/Navbar'


const dummyJson = 
  {
    "type": "game",
    "id": 1,
    "attributes": {
      "board_game_atlas_id": "VO7TAxQ5Qn",
      "name": "Dominion",
      "min_players": 2,
      "max_players": 4,
      "min_playtime": 30,
      "max_playtime": 30,
      "min_age": 13,
      "year_published": 2008,
      "description": "<p>You are a monarch, like your parents before you, a ruler of a small pleasant kingdom of rivers and evergreens. Unlike your parents, however, you have hopes and dreams! You want a bigger and more pleasant kingdom, with more rivers and a wider variety of trees. You want a Dominion! <br /><br />In all directions lie fiefs, freeholds, and feodums. All are small bits of land, controlled by petty lords and verging on anarchy. You will bring civilization to these people, uniting them under your banner.</p>\r\n<p>In <em><strong>Dominion</strong></em>, each player starts with an identical, very small deck of cards. In the center of the table is a selection of other cards the players can &quot;buy&quot; as they can afford them. Through their selection of cards to buy, and how they play their hands as they draw them, the players construct their deck on the fly, striving for the most efficient path to the precious victory points by game end.</p>",
      "thumb_url": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254200326-6135RVKbZZL.jpg",
      "image_url": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254200326-6135RVKbZZL.jpg",
      "url": "https://www.boardgameatlas.com/game/VO7TAxQ5Qn/dominion"
    }
  }




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
        return { state,searchResults: action.payload}   
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
      payload: dummyJson
     })
     
  }

  return (
  <div className='App'> 

  <Navbar submit={searchBarSubmit}></Navbar> 
    <Routes>
      <Route path='/' element={<UserDashboard />} />
      <Route path='/login' element={<Login  />} />
      <Route path='/search-results/:searchTerm' element={<SearchResults results={state.searchResults} />} />
      <Route path='/friends-games/:id' element={<FriendsGames />} />
    </Routes>
  </div>  
  )
}
