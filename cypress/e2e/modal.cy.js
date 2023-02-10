describe('Modal', () => {

  beforeEach(() => {
    cy.visit(`http://localhost:3000/`)
  });

  it("should open the modal when a game is clicked on", () => {
    cy.get('.single-tile').first().click()
    cy.get('.modal-container').should('be.visible')
  })
})