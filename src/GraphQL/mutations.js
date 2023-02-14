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

export const  ADD_GAME_TO_COLLECTION = (inputObject) => gql`
   createUserGame(input: ${inputObject}) {
    user {
      borrowedGames {
        borrowerId
        game {
          boardGameAtlasId
          description
          imageUrl
          maxPlayers
          maxPlaytime
          minAge
          minPlayers
          minPlaytime
          name
          thumbUrl
          url
        }
        status
        userId
      }
      userGames {
        borrowerId
        game {
          boardGameAtlasId
          imageUrl
          maxPlayers
          maxPlaytime
          minAge
          minPlayers
          minPlaytime
          name
          thumbUrl
          yearPublished
        }
        status
        userId
      }
      username
    }
  }
}
`