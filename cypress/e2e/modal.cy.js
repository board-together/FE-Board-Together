describe.skip('Modal', () => {

  beforeEach(() => {
    cy.visit(`http://localhost:3000/`)
    cy.get('.username-input').type('jakeandbake')
    cy.get('.enter-site-button').click()
    cy.get('.game-collection')
      .find('.single-game-img')
      .eq(0).click()
  })

  it("should open the modal when a game is clicked on", () => {
    cy.get('.game-modal').should('be.visible')
  })

  it('should show the game\'s inception date', () => {
    cy.get('p').first().contains('1971')
  })

  it('should show how many users can play the game', () => {
    cy.get('p').eq(1).contains('Players: 2 to 10')
  })

  it('should show the average playtime', () => {
    cy.get('p').eq(2).contains('Average Playtime: 30 minutes')
  })

  it('should show the minimum allowable playing age', () => {
    cy.get('p').eq(3).contains('7+')
  })

  it('should have a description of the game', () => {
    cy.get('p').eq(4).contains('Now the classic card game of matching colors and numbers comes with customizable Wild Cards for added excitement!')
  })

  it('should be able to see additional info from the game\'s website', () => {
    cy.get('a').first().should('have.attr', 'href', "https://www.boardgameatlas.com/game/Ad9NDUFxmt/uno-card-game")
  })

  it('should be able to exit modal', () => {
    cy.get('.close-modal-button').first().click()
    cy.get('.game-modal').should('not.exist')
  })

})
