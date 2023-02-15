describe.skip('Modal', () => {

  beforeEach(() => {
    cy.visit(`http://localhost:3000/`)
    cy.get('.username-input').type('randy')
    cy.get('.enter-site-button').click()
    cy.get('.game-collection')
      .find('.single-game-img')
      .eq(0).click()
  })

  it("should open the modal when a game is clicked on", () => {
    cy.get('.game-modal').should('be.visible')
  })

  it('should show the game name in header', () => {
    cy.get('h1').contains('Ticket to Ride')
  })

  it('should show the game\'s inception date', () => {
    cy.get('p').first().contains('2004')
  })

  it('should show how many users can play the game', () => {
    cy.get('p').eq(1).contains('Players: 2 to 5')
  })

  it('should show the average playtime', () => {
    cy.get('p').eq(2).contains('Average Playtime: 67.5 minutes')
  })

  it('should show the minimum allowable playing age', () => {
    cy.get('p').eq(3).contains('8+')
  })

  it('should have a description of the game', () => {
    cy.get('p').eq(4).contains('Ticket to Ride is a cross-country train adventure game. Players collect train cards that enable them to claim railway routes connecting cities throughout North America. The longer the routes, the more points they earn.')
  })

  it('should be able to see additional info from the game\'s website', () => {
    cy.get('a').first().should('have.attr', 'href', "https://www.boardgameatlas.com/game/AuBvbISHR6/ticket-to-ride")
  })

  it('should be able to exit modal', () => {
    cy.get('.close-modal-button').first().click()
    cy.get('.game-modal').should('not.exist')
  })

  it('should be able to remove games from collection', () => {
    cy.get('.delete-button').click()
    cy.get('.single-tile').should('have.length', 2)
    cy.contains('Ticket to Ride').should('not.exist')
  })
})
