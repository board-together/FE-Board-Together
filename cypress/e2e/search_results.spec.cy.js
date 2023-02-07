describe('Search_Results', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    
  })

  it('Should see the game that is searched for', () => {
    cy.get('.search-input')
      .type('Dominion')
    cy.get('.search-button')
      .click()
    cy.url()
      .should('include', 'http://localhost:3000/search-results/Dominion') 
    cy.get('.single-game-name').contains('Dominion')
    cy.get('.single-game-img')
  })
  
})