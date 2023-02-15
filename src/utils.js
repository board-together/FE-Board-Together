

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
  let arrayOfTerms = ['<p>', '</p>', '<em>', '</em>', '<br>', '<br />', '<strong>', '</strong>', '&quot;']

  arrayOfTerms.forEach(val => {
    description = description.replaceAll(val, '')
  })
  return description
}

//utills for gql testing/~/

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




//GAME STRUCTURE
// [
//   {
//       "boardGameAtlasId": "OIXt3DmJU0",
//       "url": "https://www.boardgameatlas.com/game/OIXt3DmJU0/catan",
//       "name": "Catan",
//       "yearPublished": 1995,
//       "minPlayers": 3,
//       "maxPlayers": 4,
//       "minPlaytime": 45,
//       "maxPlaytime": 90,
//       "minAge": 10,
//       "description": "<p>The women and men of your expedition build the first two settlements. Fortunately, the land is rich in natural resources. You build roads and new settlements that eventually become cities. Will you succeed in gaining supremacy on Catan? Barter trade dominates the scene. Some resources you have in abundance, other resources are scarce. Ore for wool, brick for lumber - you trade according to what is needed for your current building projects. Proceed strategically! If you found your settlements in the right places and skillfully trade your resources, then the odds will be in your favor. But your opponents are smart too.</p>\r\n<p>To begin the game, we build the game board using hexagonal terrain tiles. Catan is born - a beautiful island with mountains, pastures, hills, fields, and forests, surrounded by the sea.</p>\r\n<p>Each of us places two small houses on spaces where three terrain hexes meet. They are our starting settlements.</p>\r\n<p>And so it begins. I roll two dice. An “11”! Each terrain hex is marked with a die roll number. Each player who owns a settlement adjacent to a terrain hex marked with the number rolled receives a resource produced by this hex. Hills produce brick, forests produce lumber, mountains produce ore, fields produce grain, and pastures produce wool.</p>\r\n<p>We use these resources to expand across Catan: we build roads and new settlements, or we upgrade our existing settlements to cities. For example, a road costs 1 brick and 1 lumber. If we do not have the necessary resources, we can acquire them by trading with our opponents.</p>\r\n<p>Each settlement is worth 1 victory point and each city is worth 2 victory points. If you expand cleverly, you may be the first player to reach 10 victory points and thus win the game!</p>",
//       "thumbUrl": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1629324722072.jpg",
//       "imageUrl": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1629324722072.jpg"
//   },
//   {
//       "boardGameAtlasId": "E5TYKwLTf0",
//       "name": "Catan: Cities & Knights",
//       "yearPublished": 1998,
//       "minPlayers": 3,
//       "maxPlayers": 4,
//       "minPlaytime": 60,
//       "maxPlaytime": 90,
//       "minAge": 10,
//       "description": "Dark clouds gather over the once peaceful landscape. Wild barbarians, lured by Catan’s wealth and power, maneuver to attack. Their massive warships loom against the bright orange horizon. You must be strong! Barbarians attack the weakest targets, and the victim of their onslaught will be the player who contributes the least to the defense of Catan.<br /><br /> Don’t take any chances! Field your knights!<br /><br /> In <b>Catan: Cities &amp; Knights</b> you engage in the defense of Catan and compete to build the three great metropolises of Catan. Each of these magnificent urban centers is even more valuable than a city. They’re also immune to the dangerous barbarians. Invest in city improvements, which you acquire using three commodities of trade: coin, paper, and cloth. If you improve your culture, muster your knights, and enrich your fine cities, you will be the master of the great realm of Catan!<br /><br /><b> Components:</b><br /> 36 Commodity Cards<br /> 54 Progress Cards<br /> 6 Victory Point Cards<br /> 3 Wooden Metropolis Pieces<br /> 1 Wooden Merchant Figure<br /> 1 Custom Event Die<br /> 1 Wooden Barbarian Ship<br /> 24 Wooden Knights<br /> 12 City Walls<br /> 4 Development Flip-Charts<br /> 1 Sea Frame Piece<br /> 1 Rulebook<br />",
//       "thumbUrl": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559257359245-51DYsPZcYyL.jpg",
//       "imageUrl": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559257359245-51DYsPZcYyL.jpg",
//   }
// ]