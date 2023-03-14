import {
  getRandyUserDataBorrow,
  getRandyUserDataAfterAdd,
  addGameResponse,
  getAllUsersDataBorrow,
  singleGame,
  validateUserData
} from "../fixtures/fixture-borrowing"

const hasOperationName = (req, operationName) => {
  const { body } = req
  return (
    body.hasOwnProperty('operationName') && body.operationName === operationName
  )
}

describe('Adding a game', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/`)
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'ValidateUser')) {
        req.alias = 'gqlValidateUserQuery'
        req.on('response', (res) => {
          res.body.data = validateUserData
        })
      } else if (hasOperationName(req, 'GetAllUsers')) {
        req.alias = 'gqlGetAllUsersQuery'
        req.on('response', (res) => {
          res.body.data = getAllUsersDataBorrow
        })
      } else if (hasOperationName(req, 'searchGames')) {
        req.alias = 'gqlSearchGamesQuery'
        req.on('response', (res) => {
          res.body.data = singleGame
        })
      } else if (hasOperationName(req, 'CreateUserGame')) {
        req.alias = 'gqlCreateUserGameMutation'
        req.reply((res) => {
          res.body.data = addGameResponse
          res.body.errors = []
        })
      } else {
        req.alias = 'gqlGetUserQuery'
        req.on('response', (res) => {
          res.body.data = getRandyUserDataBorrow
        })
      }
    })
    cy.wait(2000)
    cy.get('.username-input').type('randy')
    cy.wait(1000)
    cy.get('.enter-site-button').click()
  })


  it('Should have the option to add to collection', () => {
    cy.get('.search-input')
      .type('Catan')
    cy.get('.search-button')
      .click()
    cy.get(':nth-child(1) > .game-name-Catan').contains('Catan')
      .click()
    cy.get('.modal-button')
      .click()
    cy.get('[href="/dashboard/"] > button')
      .click()
    cy.url()
      .should('include', 'http://localhost:3000/dashboard')
  })

  it('When game is added it should apear in game collection', () => {
    cy.get('.search-input')
      .type('Catan')
    cy.get('.search-button')
      .click()
    cy.get(':nth-child(1) > .game-name-Catan').contains('Catan')
      .click()
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'CreateUserGame')) {
        req.alias = 'gqlCreateUserGameMutation'
        req.reply((res) => {
          res.body.data = addGameResponse
          res.body.errors = []
        })
      } else if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery'
        req.reply({
          statusCode: 200,
          body: {
            data: getRandyUserDataAfterAdd
          }
        })
      }
    })
    cy.get('.modal-button').click()
    cy.wait(2000)
    cy.get('[href="/dashboard/"] > button').click()
  })

})