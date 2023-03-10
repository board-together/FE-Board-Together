import { gql } from "@apollo/client"



export const DELETE_GAME = gql`
mutation DeleteUserGame($input: DeleteUserGameInput!) {
  deleteUserGame(input: $input) {
    id
  }
}
`

export const UPDATE_USERGAME = gql`
  mutation UpdateUserGame($input: UpdateUserGameInput!) {
    updateUserGame(input: $input) {
      userGame {
        id
        borrowerId
        status
      }
      errors
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

