import React, { useReducer, useEffect } from 'react'
//import { useQuery, gql } from "@apollo/client"
import { Routes, Route } from 'react-router-dom'
import { UserDashboard } from '../User_Dashboard/User_Dashboard'
import { Login } from '../Login/Login'
import SearchResults from '../Search_Results/Search_Results'
import { FriendsGames } from '../Friends_Games/Friends_Games'
import dummyData from '../../dummy_user_data.json'

// dummyJson will be deleted when we connect to API 
const dummyJson = [
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
  },
  {
    "type": "game",
    "id": 2,
    "attributes": {
      "board_game_atlas_id": "oGVgRSAKwX",
      "name": "Carcassonne",
      "min_players": 2,
      "max_players": 5,
      "min_playtime": 30,
      "max_playtime": 45,
      "min_age": 7,
      "year_published": 2000,
      "description": "<p>Each game of <em>Carcassonne</em> reveals a unique environment as tiles form a landscape of cities, roads, fields, and monasteries. Claim these features with your followers to win the game.</p>\r\n<p><em>Carcassonne</em> is a tile placement game where players collectively construct the area around the medieval French city of Carcassonne while competing to place followers on various features and score the most points.</p>\r\n<p>First published in 2000, the game's accessible yet deep design has attracted a wide fan base and led to the development of numerous expansions (eg Rivers) and standalone titles in the <em>Carcassonne</em> line.</p>",
      "thumb_url": "https://cdn.shopify.com/s/files/1/0513/4077/1515/products/carcassonne-board-game.jpg?v=1609629064",
      "image_url": "https://cdn.shopify.com/s/files/1/0513/4077/1515/products/carcassonne-board-game.jpg?v=1609629064",
      "url": "https://www.zmangames.com/en/products/carcassonne/?utm_source=boardgameatlas.com&utm_medium=search&utm_campaign=bga_ads"
    }
  },
  {
    "type": "game",
    "id": 3,
    "attributes": {
      "board_game_atlas_id": "yqR4PtpO8X",
      "name": "Scythe",
      "min_players": 1,
      "max_players": 5,
      "min_playtime": 90,
      "max_playtime": 120,
      "min_age": 14,
      "year_published": 2016,
      "description": "<p><em>Scythe</em> gives players almost complete control over their fate. Other than each player's individual hidden objective card, the only elements of luck or variability are &quot;Encounter&quot; cards that players will draw as they interact with the citizens of newly explored lands. Each encounter card provides the player with several options, allowing them to mitigate the luck of the draw through their selection. Combat is also driven by choices, not luck or randomness.<br /><br /><em>Scythe</em> uses a streamlined action-selection mechanism (no rounds or phases) to keep gameplay moving at a brisk pace and reduce downtime between turns. While there is plenty of direct conflict for players who seek it, there is no player elimination.<br /><br />Every part of <em>Scythe</em> has an aspect of engine-building to it. Players can upgrade actions to become more efficient, build structures that improve their position on the map, enlist new recruits to enhance character abilities, activate mechs to deter opponents from invading, and expand their borders to reap greater types and quantities of resources. These engine-building aspects create a sense of momentum and progress throughout the game. The order in which players improve their engine adds to the unique feel of each game, even when playing one faction multiple times.</p>",
      "thumb_url": "https://cdn.shopify.com/s/files/1/0513/4077/1515/products/scythe-board-game.jpg?v=1611090922",
      "image_url": "https://cdn.shopify.com/s/files/1/0513/4077/1515/products/scythe-board-game.jpg?v=1611090922",
      "url": "https://stonemaiergames.com/games/scythe/?utm_source=boardgameatlas.com&utm_medium=search&utm_campaign=bga_ads"
    }
  }
]



const initialState = {
  searchResults: [],
  user: {},
  userName: '',
  friendsList: [],
  gameCollection: [],
  modal: null,
  error: null,
  loading: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case "success": {
      return { ...state, user: dummyData }
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
  //const { loading, error, data } = useQuery(GET_USER)

  useEffect(() => {
    dispatch({ type: 'success' })
  }, [])

  const [state, dispatch] = useReducer(reducer, initialState)

  const searchBarSubmit = (terms) => {
    let returnArray = []
    dummyJson.forEach(element => {
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



  // const setUserName = (userName) => {
  //   dispatch({
  //     type: 'set_userName',
  //     payload: userName
  //   })
  // }

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

  if (!Object.keys(state.user).length) {
    return <h1>LOADING...</h1>
  } else {
    return (
      <div className='App'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard/:username'
            element={
              <UserDashboard
                userInfo={state.user}
                searchBarSubmit={searchBarSubmit}
                setModal={setModal}
                modal={state.modal}
                deleteGame={deleteGame}
              />
            } />
          <Route path='/search-results/:searchTerm' element={<SearchResults results={state.searchResults} />} />
          <Route path='/friends-games/:id' element={<FriendsGames />} />
        </Routes>
      </div>
    )
  }
}
