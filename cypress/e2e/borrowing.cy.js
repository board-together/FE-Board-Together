const hasOperationName = (req, operationName) => {
  const { body } = req
  return (
    body.hasOwnProperty('operationName') && body.operationName === operationName
  )
}

import { getUserDataBorrow, getAllUsersDataBorrow } from "../fixtures/fixture-borrowing"

describe('Borrowing Functionality', () => {

  beforeEach(() => {
    cy.visit(`http://localhost:3000/`);
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {

      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUser';
        req.reply((res) => {
          res.body.data = getUserDataBorrow;
        });
      } else if (hasOperationName(req, 'GetAllUsers')) {
        req.alias = 'gqlGetAllUsers';
        req.reply((res) => {
          res.body.data = getAllUsersDataBorrow;
        });
      }

    })

    cy.get('.username-input')
      .type('randy');
    cy.get('.enter-site-button')
      .click()

  })

  it('Should have a friends list', () => {
    cy.get('h1')
  })

  //refetches
  //before --- after


})