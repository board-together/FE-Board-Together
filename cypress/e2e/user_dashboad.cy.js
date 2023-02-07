import 'cypress-react-selector'

describe('User Dashboard', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should welcome the user', () => {
    cy.get('.welcome-greeting').contains('Welcome, GarBear88!')
  })

  it('should have a container for the user\'s games', () => {
    cy.get('.user-dashboard').contains('My Games')
    cy.get('.game-collection').should('be.visible')
  })

  it('should show the user\'s list of friends', () => {
    cy.get('.friends-section').contains('My Friends')
    cy.get('.friends-list').should('be.visible')
    cy.get('.friend').first().contains('Larry')
    cy.get('.friend').eq(1).contains('Terry')
    cy.get('.friend').eq(2).contains('Jerry')
    cy.get('.friend').last().contains('Harry')
  })

  it('should have a persistent Navbar', () => {
  })
})