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
  badValidationResponse
} from "../fixtures/fixture-borrowing"

describe('Login Page', () => {

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
  })

  it('Should have welcome text and a login heading', () => {
    cy.get('h1').should('have.text', 'BoardTogether')
    cy.get('h2').last().should('have.text', 'Login')
  })

  it('Should have an input where user can enter their username', () => {
    cy.get('.username-input').should('have.value', '')
      .type('randy')
      .should('have.value', 'randy')
  })

  it('Should take the user to their dashboard when they enter their username', () => {
    cy.get('.username-input').type('randy')
    cy.wait(1000)
    cy.get('.enter-site-button').click()
    cy.url().should('equal', 'http://localhost:3000/dashboard/')
  })

})

describe("Login page sad paths", () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.wait(2000)
  })

  it('should warn the user if the entered username is invalid', () => {
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'ValidateUser')) {
        req.alias = 'gqlValidateUserQuery'
        req.on('response', (res) => {
          res.body.data = badValidationResponse
        })
      }
    })
    cy.get('.username-input')
      .type('barfyman342')
    cy.get('.enter-site-button')
      .click()
    cy.get('.invalid-name-message').should('have.text', 'Please enter a valid username')
  })
})