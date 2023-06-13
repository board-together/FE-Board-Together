import {
  getRandyUserDataBorrow,
  getAllUsersDataBorrow,
  validateUserData,
  singleGame
} from "../fixtures/fixture-borrowing"

const hasOperationName = (req, operationName) => {
  const { body } = req
  return (
    body.hasOwnProperty('operationName') && body.operationName === operationName
  )
}

describe.skip('Search_Results', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
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

  it('Should navigate to the search results page', () => {
    cy.get('.search-input').type('Catan')
    cy.get('.search-button').click()
    cy.url().should('include', 'http://localhost:3000/search-results/Catan')
  })

  it('Should see the game that is searched for', () => {
    cy.get('.search-input').type('Catan')
    cy.get('.search-button').click()

    cy.get('.single-tile-v').should('have.length', 1)
    cy.get('.single-tile-v').first().contains('Catan')
  })

  it('Should see more info when game is clicked', () => {
    cy.get('.search-input')
      .type('Catan')
    cy.get('.search-button')
      .click()
    cy.get(':nth-child(1) > .game-name-Catan').contains('Catan')
      .click()
    cy.get('.modal-details > :nth-child(4)').contains('The women and men of your expedition build the first two settlements. Fortunately, the land is rich in natural resources.')
  })

})
