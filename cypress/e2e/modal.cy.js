describe('Modal', () => {

  beforeEach(() => {
    cy.visit(`http://localhost:3000/`)
    cy.get('.username-input').type('GarBear88')
    cy.get('.enter-site-button').click()
    cy.get('.single-tile').first().click()
  });

  it("should open the modal when a game is clicked on", () => { 
    cy.get('.game-modal').should('be.visible')
  })

  it('should show the game name in header', () => {
    cy.get('h1').contains('Dominion')
  })

  it('should show the game\'s inception date', () => {
    cy.get('p').first().contains('2008')
  })

  it('should show how many users can play the game', () => {
    cy.get('p').eq(1).contains('Players: 2 to 4')
  })

  it('should show the average playtime', () => {
    cy.get('p').eq(2).contains('Average Playtime: 30 minutes')
  })

  it('should show the minimum allowable playing age', () => {
    cy.get('p').eq(3).contains('13+')
  })
})