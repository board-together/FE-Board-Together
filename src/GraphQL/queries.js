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
            status
            borrowerId
        }
    }
  }`

export const GET_GAME_DETAIL = (id) => gql`
    query {

    }
  `

export const GET_SEARCHED_GAMES = (name) => gql`
    query {
      games(name: "${name}") {
        board_game_atlas_id
        name
        thumb_url
        image_url
      }
    }
  `


export const GET_ALL_USERS = gql`
    query {
      users {
          id
          username
      }  
    }
  `