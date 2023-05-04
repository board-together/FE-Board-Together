import { gql } from "@apollo/client"

export const VALIDATE_USER = gql`
query ValidateUser($username: String!) {
  user(username: $username) {
    username
  }
}
`

export const GET_USER_ID = gql`
query ValidateUser($username: String!) {
  user(username: $username) {
    username
    id
  }
}
`

export const GET_USER = (username) => gql`
   query GetUser {
    user(username: "${username}") {
      id
      username
      userGames {
        id
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
        id
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
  }
  `

export const GET_SEARCHED_GAMES = (name) => gql`
    query searchGames {
    searchGames(name: "${name}") {
    boardGameAtlasId
    description
    imageUrl
    url
    maxPlayers
    maxPlaytime
    minAge
    minPlayers
    minPlaytime
    name
    thumbUrl
    yearPublished
  }
    }
  `

// export const GET_SEARCHED_GAMES = gql`
// query Query($name: String!) {
//   searchGames(name: $name) {
//     description
//     boardGameAtlasId
//     id
//     imageUrl
//     maxPlayers
//     maxPlaytime
//     minAge
//     minPlayers
//     minPlaytime
//     name
//     thumbUrl
//     url
//     yearPublished
//   }
// }
// `

export const GET_MODAL_GAME = (name) => gql`
  query GetModalGame {
    searchGames(name: "${name}") {
    boardGameAtlasId
    description
    imageUrl
    url
    maxPlayers
    maxPlaytime
    minAge
    minPlayers
    minPlaytime
    name
    thumbUrl
    yearPublished
    }
  }
  `

export const GET_ALL_USERS = gql`
    query GetAllUsers {
      users {
          id
          username
      }  
    }
  `