describe('Friends_Games', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/friends-games/Larry')

  })

  it('Should have a list of games ', () => {
    cy.get('#game-name-1').contains("Dominion")  
  })

  it('Should have a name showing whos games the user is viewing', () => {
    cy.get('.friend-name').contains('Larrys Games')
  })

  it('Should have a button that takes the useer back to there dashboard', () => {
    cy.get('[href="/dashboard/GarBear88"] > button').click()
      .url('http://localhost:3000/dashboard/GarBear88')
  })

})