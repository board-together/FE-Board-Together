describe('Search_Results', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('.username-input')
      .type('randy');
    cy.get('.enter-site-button')
      .click()
    cy.intercept('POST', "https://board-together.herokuapp.com/graphql", (req) => {
      cy.stub()
        .callsFake(req => req.reply({ fixture: 'single_user.json' })).as('user')
    })
  })

  it('Should see the game that is searched for', () => {
    cy.get('.search-input')
      .type('Catan')
    cy.get('.search-button')
      .click()
    cy.url()
      .should('include', 'http://localhost:3000/search-results/Catan') 
    cy.get(':nth-child(1) > .game-name-Catan').contains('Catan')
    cy.get(':nth-child(1) > .single-game-img-v')
  })

  it('Should see more info when game is clicked', () => {
    cy.get('.search-input')
      .type('Catan')
    cy.get('.search-button')
      .click()
    cy.get(':nth-child(1) > .game-name-Catan').contains('Catan')
       .click()
    cy.get('.modal-details > :nth-child(4)').contains('The women and men of your expedition build the first two settlements. Fortunately, the land is rich in natural resources.')
  })
  
})
