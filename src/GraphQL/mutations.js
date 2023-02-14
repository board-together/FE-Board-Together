import { gql } from "@apollo/client"

export const CREATE_USER = (username) => gql`
  mutation {
    createUser(input: {username: ${username}}) {
      user {
        id
        username
      }
    }
  }
`

export const UPDATE_GAME = () => gql`
    mutation {
      users {
          id
          username
      }  
    }
  `




export const  ADD_GAME_TO_COLLECTION = gql`
 mutation Mutation($input: CreateUserGameInput!) {
  createUserGame(input: $input) {
    user {
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
          minPlaytime
          minPlayers
          minAge
          maxPlaytime
          maxPlayers
          description
          thumbUrl
          imageUrl
        }
      }
    }
  }
}`