describe('Search_Results', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('.username-input')
      .type('randy');
    cy.get('.enter-site-button')
      .click()
    cy.intercept('POST', "https://board-together.herokuapp.com/graphql", (req) => {
      cy.stub()
        .callsFake(req => req.reply({ fixture: 'single_user.json' })).as('user')
    })
  })


  it('Should have the option to add to collection', () => {
    cy.get('.search-input')
      .type('Catan')
    cy.get('.search-button')
      .click()
    cy.intercept('POST', "https://board-together.herokuapp.com/graphql", (req) => {
      cy.stub()
        .callsFake(req => req.reply({ fixture: 'single_user.json' })).as('user')
    })
    cy.get(':nth-child(1) > .game-name-Catan').contains('Catan')
      .click()
    cy.get('.modal-button')
      .click()
    cy.get('[href="/dashboard/"] > button')
      .click()
    cy.url()
      .should('include', 'http://localhost:3000/dashboard')
  })

  // it('When game is added it should apear in game collection', () => {
  //   cy.get('.search-input')
  //     .type('Catan')
  //   cy.get('.search-button')
  //     .click()
  //   cy.get(':nth-child(1) > .game-name-Catan').contains('Catan')
  //     .click()
  //   cy.get('.modal-button')
  //     .click()
  //   cy.get('[href="/dashboard/"] > button')
  //     .click()
  //   cy.url()
  //     .should('include', 'http://localhost:3000/dashboard')

  // })

})