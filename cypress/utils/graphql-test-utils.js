// utils/graphql-test-utils.js

// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req, operationName) => {
  const { body } = req
  return (
    body.hasOwnProperty('operationName') && body.operationName === operationName
  )
}

// Alias query if operationName matches
export const aliasQuery = (req, operationName, responseData) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`
    req.on('response', (res) => {
      res.body.data = responseData;
    })
  }
}

// Alias mutation if operationName matches
export const aliasMutation = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`
  }
}