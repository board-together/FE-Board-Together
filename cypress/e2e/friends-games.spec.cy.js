describe('Friends_Games', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/friends-games/Larry')

  })

  it('Should ', () => {
    cy.get('#game-name-1').contains("Dominion")
    
  })

})