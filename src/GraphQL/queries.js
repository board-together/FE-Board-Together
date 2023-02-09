import { gql } from "@apollo/client"


export const GET_USER = (userName) => gql`
   query {
    user(username: "${userName}") {
        id
        username
        games {
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
  }`



  export const GET_ALL_USERS = gql`
    query {
      users {
          id
          username
      }  
    }
  `