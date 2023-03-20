import {
  getRandyUserDataBorrow,
  getAllUsersDataBorrow,
  validateUserData,
} from "../fixtures/fixture-borrowing"

const hasOperationName = (req, operationName) => {
  const { body } = req
  return (
    body.hasOwnProperty('operationName') && body.operationName === operationName
  )
}

describe('User Dashboard', () => {
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

  it('should be the root page route', () => {
    cy.url().should('eq', 'http://localhost:3000/dashboard/')
  })

  it('should welcome the user', () => {
    cy.get('.welcome-greeting').contains('Welcome, randy!')
  })

  it('should have a container for the user\'s games', () => {
    cy.get('.user-dashboard').contains('My Games')
    cy.get('.game-collection').should('be.visible')
  })

  it('should show the user\'s list of friends', () => {
    cy.get('.friends-section').contains('My Friends')
    cy.get('.friends-list').should('be.visible')
    cy.get('.friend').first().contains('honey')
    cy.get('[href="/friends-games/honey"] > .friend').contains('honey')
  })

})
