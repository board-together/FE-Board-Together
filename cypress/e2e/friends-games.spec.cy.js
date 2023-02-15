
import { aliasQuery, aliasMutation } from '../../src/utils'


describe.skip('Friends_Games', () => {
  beforeEach(() => {
    cy.intercept('POST', "https://board-together.herokuapp.com/graphql", (req) => {
      
      // Queries
      aliasQuery(req, 'GetUser')

    if (req.body.operationName === 'GetFriends') {
        req.alias = 'graphqlGetUser'
      }
    })
    cy.visit('http://localhost:3000/')
  })



  it('Should have a list of games ', () => {
    cy.get('.single-game-name').eq(0).should('have.text', 'Ticket to Ride')  

  })

  it('Should have a name showing whos games the user is viewing', () => {
    cy.get('.friend-name').contains(`Pickafloof's Games`)
  })


  it('Should have a button that takes the useer back to there dashboard', () => {

  it('Should have a button that takes the user back to there dashboard', () => {

    cy.get('.back-to-dash').click()
      .url('http://localhost:3000/dashboard')
  })

})
