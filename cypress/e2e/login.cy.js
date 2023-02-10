describe('Login Page', () => {

  beforeEach(() => {
    cy.visit(`http://localhost:3000/`)
    /* Issue for future testing: how intercept Apollo/GraphQL query? */
  });

  it('Should have welcome text and a login heading', () => {
    cy.get('h1').should('have.text', 'Welcome to Board Together');
    cy.get('h2').should('have.text', 'Login');
  });

  it('Should have an input where user can enter their username', () => {

    

  });

})