import {
  getRandyUserDataBorrow,
  getAllUsersDataBorrow,
  getHoneyUserDataBorrow,
  getHoneyUserDataBorrowAFTER,
  updatedGameResponse,
  getRandyUserDataBorrowAFTER,
  updatedGameResponseReturn,
  getRandyUserDataAfterDelete,
  validateUserData
} from "../fixtures/fixture-borrowing"

const hasOperationName = (req, operationName) => {
  const { body } = req
  return (
    body.hasOwnProperty('operationName') && body.operationName === operationName
  )
}

describe.skip('Search_Results', () => {
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

  it('should start with two games in view', () => {
    cy.get('.single-tile').should('have.length', 2)
    cy.get('div[id="23"]').should('be.visible')
    cy.get('div[id="7"]').should('be.visible')
    cy.contains('Ticket to Ride')
    cy.contains('Phase 10')
  })

  it('should open modal', () => {
    cy.get('.single-tile').last().click()
    cy.get('.game-modal').should('be.visible')
  })

  it('should show the "delete" button in the modal of an unborrowed game', () => {
    cy.get('.single-tile').last().click()
    cy.get('.delete-button').should('exist')
  })

  it('should be able to delete a game', () => {
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
    cy.get('.single-tile').should('have.length', 1)
    cy.get('div[id="23"]').should('not.exist')
    cy.contains('Ticket to Ride').should('not.exist')
    cy.get('div[id="7"]').should('be.visible')
    cy.contains('Phase 10')
  })


})