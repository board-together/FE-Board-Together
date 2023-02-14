// describe('Search_Results', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000/')
//     cy.get('.username-input')
//       .type('honey');
//     cy.get('.enter-site-button')
//       .click()
//   })

//   it('Should see the game that is searched for', () => {
//     cy.get('.search-input')
//       .type('Catan')
//     cy.get('.search-button')
//       .click()
//     cy.url()
//       .should('include', 'http://localhost:3000/search-results/Catan') 
//     cy.get(':nth-child(1) > .game-name-Catan').contains('Catan')
//     cy.get(':nth-child(1) > .single-game-img-v')
//   })
  
// })
