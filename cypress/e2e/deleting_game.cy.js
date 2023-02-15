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

  it('should have the option to delete a game', () => {
    cy.get('.single-tile').last().click()

    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'DeleteUserGame')) {
        req.alias = 'gqlDeleteUserGameMutation'
        req.reply((res) => {
          res.body.data = updatedGameResponse
          res.body.errors = []
        })
      }
    })
    cy.get('.delete-button').click()
    cy.wait(1001)
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery'
        req.on("response", (res) => {
          res.body.data = getRandyUserDataAfterDelete
          console.log(res.body)
        })
      }
    })
  })


})