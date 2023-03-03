import { gql } from "@apollo/client"

export const VALIDATE_USER = gql`
query ValidateUser($username: String!) {
  user(username: $username) {
    username
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
    query {
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