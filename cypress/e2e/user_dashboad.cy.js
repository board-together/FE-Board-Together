import 'cypress-react-selector'

describe('User Dashboard', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard/randy')
  })

  it('should be the root page route', () => {
    cy.url().should('eq', 'http://localhost:3000/dashboard/randy')
  })

  it('should welcome the user', () => {
    cy.get('.welcome-greeting').contains('Welcome, randy!')
  })

  it('should have a container for the user\'s games', () => {
    cy.get('.user-dashboard').contains('My Games')
    cy.get('.game-collection').should('be.visible')
  })

  it('should show the user\'s list of friends', () => {
    cy.get('.friends-section').contains('My Friends')
    cy.get('.friends-list').should('be.visible')
    cy.get('.friend').first().contains('Larry')
    cy.get('.friend').eq(1).contains('Terry')
    cy.get('.friend').eq(2).contains('Jerry')
    cy.get('.friend').last().contains('Harry')
  })

  it('should have a persistent Navbar', () => {
  })

  it('should show the user\'s games', () => {
    cy.contains('Dominion')
    cy.contains('Carcassonne')
    cy.contains('Scythe')
    cy.get('.game-collection')
      .find('.single-game-img')
      .eq(0).should('have.attr', 'src', "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254200326-6135RVKbZZL.jpg")
    cy.get('.game-collection')
      .find('.single-game-img')
      .eq(1).should('have.attr', 'src', "https://cdn11.bigcommerce.com/s-wue8xznink/images/stencil/1280x1280/products/357/17642/pic6544250_1__09565.1658423124.png?c=2")
      cy.get('.game-collection')
      .find('.single-game-img')
      .eq(2).should('have.attr', 'src', "https://cdn.shopify.com/s/files/1/0513/4077/1515/products/scythe-board-game.jpg?v=1611090922")
  })
})
