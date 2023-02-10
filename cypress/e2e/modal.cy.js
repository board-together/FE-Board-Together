describe('Modal', () => {

  beforeEach(() => {
    cy.visit(`http://localhost:3000/`)
    cy.get('.username-input').type('GarBear88')
    cy.get('.enter-site-button').click()
    cy.get('.single-tile').first().click()
  })

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

  it('should have a description of the game', () => {
    cy.get('p').eq(4).contains('You are a monarch, like your parents before you, a ruler of a small pleasant kingdom of rivers and evergreens.')
  })

  it('should be able to see additional info from the game\'s website', () => {
    cy.get('a').first().should('have.attr', 'href', "https://www.boardgameatlas.com/game/VO7TAxQ5Qn/dominion")
  })

  it('should be able to exit modal', () => {
    cy.get('.close-modal-button').first().click()
    cy.get('.game-modal').should('not.exist')
  })

  it('should be able to remove games from collection', () => {
    cy.get('.delete-button').click()
    cy.get('.single-tile').should('have.length', 2)
    cy.contains('Dominion').should('not.exist')
  })
})