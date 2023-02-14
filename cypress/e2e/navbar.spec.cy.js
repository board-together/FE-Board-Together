// describe('Navbar', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000/')
//     cy.get('.username-input')
//       .type('randy');
//     cy.get('.enter-site-button')
//       .click()
//     cy.get('.navbar-container')
//   })
  
//   it('Should have a navbar with a site title', () => {
//     cy.get('.app-name').contains('Board Together')
//   })

//   it('Should have a navbar with a welcome greeting', () => {
//     cy.get('.welcome-greeting').contains('Welcome,')
//   })

//   it('Should have a navbar with a searchbar that can search and redirect to the corect url', () => {
//     cy.get('.search-input')
//       .type('Catan');
//     cy.get('.search-button')
//       .click();
//     cy.url()
//       .should('include', 'http://localhost:3000/search-results/Catan');
//   })
// })
