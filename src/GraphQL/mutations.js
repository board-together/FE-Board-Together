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
