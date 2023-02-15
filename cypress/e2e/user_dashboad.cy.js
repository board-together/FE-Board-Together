
import 'cypress-react-selector'

describe('User Dashboard', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('.username-input')
      .type('randy');
    cy.get('.enter-site-button')
      .click()
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
    cy.get('.friend').first().contains('Pickafloof')
    cy.get('[href="/friends-games/abdulredd"] > .friend').contains('abdulredd')
    //Will need to test all or stub data
  })


  it('should show the user\'s games', () => {
    cy.contains('Ticket to Ride')
    cy.contains('Rummikub')
    cy.get('.game-collection')
      .find('.single-game-img')
      .eq(0).should('have.attr', 'src', "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1629324738308.jpg")
    cy.get('.game-collection')
      .find('.single-game-img')
      .eq(1).should('have.attr', 'src', "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254849801-61DrzE6DaPL.jpg")
  })
})
