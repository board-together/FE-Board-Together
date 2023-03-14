const hasOperationName = (req, operationName) => {
  const { body } = req
  return (
    body.hasOwnProperty('operationName') && body.operationName === operationName
  )
}

import {
  getRandyUserDataBorrow,
  getAllUsersDataBorrow,
  validateUserData,
} from "../fixtures/fixture-borrowing"

describe('Navbar', () => {
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

  it('Should have a navbar with a site title', () => {
    cy.get('.app-name-board').contains('BOARD')
    cy.get('.app-name-together').contains('TOGETHER')

  })

  it('Should have a navbar with a welcome greeting', () => {
    cy.get('.welcome-greeting').contains('Welcome,')
    cy.get('.welcome-greeting').contains('randy')
  })

  it('Should have a navbar with a searchbar that can search and redirect to the corect url', () => {
    cy.get('.search-input')
      .type('Catan')
    cy.get('.search-button')
      .click()
    cy.url()
      .should('include', 'http://localhost:3000/search-results/Catan')
  })
})
