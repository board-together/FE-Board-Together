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


// //this is modal 
// boardGameAtlasId
// description
// imageUrl
// maxPlayers
// maxPlaytime
// minAge
// minPlayers
// minPlaytime
// name
// thumbUrl
// yearPublished
//The object below is the required feilds  we need to give ADD_GAME
// {
//       userId: 4,
//       boardGameAtlasId: "OIXt3DmJU0",
//       url: "https://www.boardgameatlas.com/game/OIXt3DmJU0/catan",
//       name: "Catan",
//       yearPublished: "1995",
//       minPlayers: "3",
//       maxPlayers: "4",
//       minPlaytime: "45",
//       maxPlaytime: "90",
//       minAge: "10",
//       description: "settlers of catan",
//       thumbUrl: "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1629324722072.jpg",
//       imageUrl: "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1629324722072.jpg"
//   }


export const  ADD_GAME_TO_COLLECTION = (inputObject) => gql`
 mutation {
  createUserGame(input: ${inputObject}) {
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