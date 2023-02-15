
describe('Login Page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept('POST',  "https://board-together.herokuapp.com/graphql", (req) => {
      cy.stub()
        .callsFake(req => req.reply({ fixture: 'single_user.json' })).as('user')   
    })
  });

  it('Should have welcome text and a login heading', () => {
    cy.get('h1').should('have.text', 'BoardTogether');
    cy.get('h2').should('have.text', 'Login');
  });

  it('Should have an input where user can enter their username', () => {
    cy.get('.username-input').should('have.value', '')
      .type('randy')
      .should('have.value', 'randy');
  });

  it('Should only let the user into the site if they enter a valid username', () => {
    cy.get('.username-input')
      .type('barfyman342');
    cy.get('.invalid-user-button')
      .click();
    cy.get('.invalid-name-message').should('have.text', 'Please enter a valid username')
  });

  it('Should take the user to their dashboard when they enter their username', () => {
    cy.get('.username-input')
      .type('randy');
    cy.get('.enter-site-button')
      .click()
      .url().should('equal', 'http://localhost:3000/dashboard/')

   


    

  });

})
