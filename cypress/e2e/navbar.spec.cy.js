describe('Navbar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('.username-input')
      .type('randy');
    cy.get('.enter-site-button')
      .click()
    cy.get('.navbar-container')
  })
  
  it('Should have a navbar with a site title', () => {
    cy.get('.app-name-board').contains('BOARD')
    cy.get('.app-name-together').contains('TOGETHER')

  })

  it('Should have a navbar with a welcome greeting', () => {
    cy.get('.welcome-greeting').contains('Welcome,')
    cy.get('.welcome-greeting').contains('randy')
  })

  it('Should have a navbar with a searchbar that can search and redirect to the corect url', () => {
    cy.get('.search-input')
      .type('Catan');
    cy.get('.search-button')
      .click();
    cy.url()
      .should('include', 'http://localhost:3000/search-results/Catan');
  })
})
