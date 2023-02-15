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
  })

})
