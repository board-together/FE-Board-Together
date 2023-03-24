export let usernames = ["Pickafloof", "randy", "abdulredd", "heatherf", "jeff", "drake", "dug", "honey", "jakeandbake"]

export const cleanSearchResult = (games) => {
  return games.map(game => {
    return {
      "boardGameAtlasId": game.id,
      "url": game.url,
      "name": game.name,
      "yearPublished": game.year_published,
      "minPlayers": game.min_players,
      "maxPlayers": game.max_players,
      "minPlaytime": game.min_playtime,
      "maxPlaytime": game.max_playtime,
      "minAge": game.min_age,
      "description": game.description,
      "thumbUrl": game.thumb_url,
      "imageUrl": game.image_url
    }
  })
}

export const cleanGameDescription = (description) => {
  let arrayOfTerms = ['<b>', '</b>','<p>', '</p>', '<em>', '</em>', '<br>', '<br />', '<strong>', '</strong>', '&quot;', '&amp']

  arrayOfTerms.forEach(val => {
    description = description.replaceAll(val, '')
  })
  return description
}

export const randomNum = (max) => {
  return Math.floor(Math.random() * max)
}

// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req, operationName) => {
  const { body } = req
  return (
    body.hasOwnProperty('operationName') && body.operationName === operationName
  )
}

// Alias query if operationName matches
export const aliasQuery = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`
  }
}

// Alias mutation if operationName matches
export const aliasMutation = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`
  }
}

