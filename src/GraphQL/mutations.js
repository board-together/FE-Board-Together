import { gql } from "@apollo/client"

//NOTE: for example input would be {username: "Gary"}
// export const CREATE_USER = gql`
// mutation CreateUser($input: CreateUseInput!){
//   createUser (input: $input) {
//     user {
//       username
//     }
//   }
// `

//NOTE: for example input would be {id: 15}
// export const DELETE_USER = gql`
// mutation Mutation($input: DeleteUserInput!) {
//   deleteUser(input: $input) {
//     id
//   }
// }
// `

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

export const ADD_GAME_TO_COLLECTION = gql`
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
}
`