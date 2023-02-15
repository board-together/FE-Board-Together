describe.skip('Friends_Games', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept("POST", 'https://board-together.herokuapp.com/graphql', { fixture: '../fixtures/getSingleUser.json' })
    cy.get('.username-input')
      .type('randy')
    cy.get('.enter-site-button')
      .click()
    cy.get('.friend').eq(0).click()
  })

  it('Should have a list of games ', () => {
    cy.get('.single-game-name').eq(0).should('have.text', 'Ticket to Ride')
  })

  it('Should have a name showing whos games the user is viewing', () => {
    cy.get('.friend-name').contains(`Pickafloof's Games`)
  })

  it('Should have a button that takes the useer back to there dashboard', () => {
    cy.get('.back-to-dash').click()
      .url('http://localhost:3000/dashboard')
  })

})
