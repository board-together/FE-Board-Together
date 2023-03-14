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

describe('Modal', () => {

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
    cy.get('.game-collection')
      .find('.single-game-img')
      .eq(1).click()
  })

  it("should open the modal when a game is clicked on", () => {
    cy.get('.game-modal').should('be.visible')
  })

  it("should show the game's title", () => {
    cy.get('h1').contains('Ticket to Ride')
  })

  it('should show the game\'s inception date', () => {
    cy.get('p').first().contains('2004')
  })

  it('should show how many users can play the game', () => {
    cy.get('p').eq(1).contains('Players: 2 to 5')
  })

  it('should show the average playtime', () => {
    cy.get('p').eq(2).contains('Average Playtime: 67.5 minutes')
  })

  it('should show the minimum allowable playing age', () => {
    cy.get('p').eq(3).contains('8+')
  })

  it('should have a description of the game', () => {
    cy.get('p').eq(4).contains('Ticket to Ride is a cross-country train adventure game. Players collect train cards that enable them to claim railway routes connecting cities throughout North America. The longer the routes, the more points they earn. Additional points come to those who can fulfill their Destination Tickets by connecting two distant cities, and to the player who builds the longest continuous railway. So climb aboard for some railroading fun and adventure. You\'ve got a Ticket to Ride!')
  })

  it('should be able to see additional info from the game\'s website', () => {
    cy.get('a').first().should('have.attr', 'href', "https://www.boardgameatlas.com/game/AuBvbISHR6/ticket-to-ride")
  })

  it('should be able to exit modal', () => {
    cy.get('.close-modal-button').first().click()
    cy.get('.game-modal').should('not.exist')
  })

})
