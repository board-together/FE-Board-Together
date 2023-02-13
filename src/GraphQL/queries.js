import { gql } from "@apollo/client"

//QUERIES
//Search Games
//Get Single User
//Get Single Game
//Get All Users (Friends)

export const GET_USER = (userName) => gql`
   query {
    user(username: "${userName}") {
      id
      username
      userGames {
        userId
        gameId
        status
        borrowerId
        game {
          id
          boardGameAtlasId
          url
          name
          yearPublished
          minPlayers
          maxPlayers
          minPlaytime
          maxPlaytime
          minAge
          description
          thumbUrl
          imageUrl
        }
      }
      borrowedGames {
        userId
        gameId
        status
        borrowerId
        game {
          name
          id
          boardGameAtlasId
          url
          name
          yearPublished
          minPlayers
          maxPlayers
          minPlaytime
          maxPlaytime
          minAge
          description
          thumbUrl
          imageUrl
        }
      }
    }
  }`


//Example query response for single user
// {
//   “data”: {
//     “user”: {
//       “id”: “10",
//       “username”: “tuan”,
//       “userGames”: [
//         {
//           “userId”: 10,
//           “gameId”: 10,
//           “status”: 0,
//           “borrowerId”: null,
//           “game”: {
//             “id”: “10",
//             “boardGameAtlasId”: “ed8889",
//             “url”: “http://hegmann-cummings.io/charity”,
//             “name”: “Metroid Prime 3: Corruption”,
//             “yearPublished”: 2023,
//             “minPlayers”: 2,
//             “maxPlayers”: 7,
//             “minPlaytime”: 43,
//             “maxPlaytime”: 52,
//             “minAge”: 5,
//             “description”: “Suscipit laboriosam ratione. Voluptatum quasi tenetur. Consectetur amet atque.“,
//             “thumbUrl”: “http://fritsch.name/leola.morar”,
//             “imageUrl”: “https://loremflickr.com/300/300”
//           }
//         }
//       ],
//       “borrowedGames”: []
//     }
//   }
// }

export const GET_GAME_DETAIL = (id) => gql`
    query {

    }
  `

export const GET_SEARCHED_GAMES = (name) => gql`
    query {
      games(name: "${name}") {
        board_game_atlas_id
        name
        thumb_url
        image_url
      }
    }
  `

export const GET_MODAL_GAME = (name) => gql`
  query {
    searchGames(name: "${name}") {
      id
      description
      name
      imageUrl
      maxPlayers
      maxPlaytime
      minAge
      minPlayers
      minPlaytime
      url
      yearPublished
      boardGameAtlasId
    }
  }
  `

export const GET_ALL_USERS = gql`
    query {
      users {
          id
          username
      }  
    }
  `