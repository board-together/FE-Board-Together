import { gql } from "@apollo/client"

// export const CREATE_USER = (username) => gql`
//   mutation {
//     createUser(input: {username: ${username}}) {
//       user {
//         id
//         username
//       }
//     }
//   }
// `

// export const UPDATE_GAME = () => gql`
//     mutation {
//       users {
//           id
//           username
//       }  
//     }
//   `

export const DELETE_GAME = gql`
mutation DeleteUserGame($input: DeleteUserGameInput!) {
  deleteUserGame(input: $input) {
    id
  }
}
`