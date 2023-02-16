const hasOperationName = (req, operationName) => {
  const { body } = req
  return (
    body.hasOwnProperty('operationName') && body.operationName === operationName
  )
}

import {
  getRandyUserDataBorrow,
  getAllUsersDataBorrow,
  getHoneyUserDataBorrow,
  getHoneyUserDataBorrowAFTER,
  updatedGameResponse,
  getRandyUserDataBorrowAFTER,
  updatedGameResponseReturn,
  getRandyUserDataAfterDelete
} from "../fixtures/fixture-borrowing"

describe('Search_Results', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/`)
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery'
        req.on('response', (res) => {
          res.body.data = getRandyUserDataBorrow
        })
      } else if (hasOperationName(req, 'GetAllUsers')) {
        req.alias = 'gqlGetAllUsersQuery'
        req.on('response', (res) => {
          res.body.data = getAllUsersDataBorrow
        })
      }
    })
    cy.get('.username-input')
      .type('randy')
    cy.get('.enter-site-button')
      .click()
  })

  it('should confirm true is equal to true', () => {
    expect(true).to.equal(true)
  })

  it('should have the option to delete a game', () => {
    cy.get('.single-tile').last().click()
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery'
        req.reply({
          statusCode: 200,
          body: {
            data: getRandyUserDataAfterDelete
          }
        })
      } else if (hasOperationName(req, 'deleteUserGame')) {
        req.alias = 'gqlDeleteUserGameMutation'
        req.reply((res) => {
          res.body.data = updatedGameResponse
          res.body.errors = []
        })
      }
    })
    cy.get('.delete-button').click()
  })


})