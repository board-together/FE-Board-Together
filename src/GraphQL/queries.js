import { gql } from "@apollo/client"

//QUERIES
//Search Games
//Get Single User
//Get Single Game
//Get All Users (Friends)

export const GET_USER = (userName) => gql`
   query GetUser {
    user(username: "${userName}") {
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
  }`




export const GET_GAME_DETAIL = (id) => gql`
    query {

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