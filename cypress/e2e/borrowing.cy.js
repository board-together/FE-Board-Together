const hasOperationName = (req, operationName) => {
  const { body } = req
  return (
    body.hasOwnProperty('operationName') && body.operationName === operationName
  )
}

import { getRandyUserDataBorrow, 
  getAllUsersDataBorrow, 
  getHoneyUserDataBorrow, 
  getHoneyUserDataBorrowAFTER,
  updatedGameResponse 
} from "../fixtures/fixture-borrowing"

describe('Borrowing Functionality', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/`);
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {

      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.reply((res) => {
          res.body.data = getRandyUserDataBorrow;
        });
      } else if (hasOperationName(req, 'GetAllUsers')) {
        req.alias = 'gqlGetAllUsersQuery';
        req.reply((res) => {
          res.body.data = getAllUsersDataBorrow;
        });
      }
    });
    cy.get('.username-input')
      .type('randy');
    cy.get('.enter-site-button')
      .click()
  })

  it('Should have a place to show their borrowed games', () => {
    cy.get('.borrowed-games-collection').should('be.empty');
  });

  it('Should be able to look at their friends\'games', () => {
    cy.get('.friend').should('have.text', 'honey');
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.reply((res) => {
          res.body.data = getHoneyUserDataBorrow;
        });
      } else if (hasOperationName(req, 'GetAllUsers')) {
        req.alias = 'gqlGetAllUsersQuery';
        req.reply((res) => {
          res.body.data = getAllUsersDataBorrow;
        });
      }
    })
    cy.get('.friend').click()
    cy.get('.friends-games-container')
      .find('.single-game-img');
  });

  it('Should be able to click on their friends game to see a modal pop up', () => {
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.reply((res) => {
          res.body.data = getHoneyUserDataBorrow;
        });
      } else if (hasOperationName(req, 'GetAllUsers')) {
        req.alias = 'gqlGetAllUserQuery';
        req.reply((res) => {
          res.body.data = getAllUsersDataBorrow;
        });
      }
    });
    cy.get('.friend').click();
    cy.get('.friends-games-container')
      .find('.single-game-img').click();
    cy.get('.game-modal').should('be.visible');
    cy.contains('Village');
  });

  it('Should have a button that says "Borrow" that borrows the game', () => {
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.reply((res) => {
          res.body.data = getHoneyUserDataBorrow;
        });
      } else if (hasOperationName(req, 'GetAllUsers')) {
        req.alias = 'gqlGetAllUsersQuery';
        req.reply((res) => {
          res.body.data = getAllUsersDataBorrow;
        });
      }
    });
    cy.get('.friend').click();
    cy.get('.friends-games-container')
      .find('.single-game-img').click();

    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.reply((res) => {
          res.body.data = getHoneyUserDataBorrowAFTER;
        });
      } else if (hasOperationName(req, 'UpdateUserGame')) {
        req.alias = 'gqlUpdateUserGameMutation';
        req.reply((res) => {
          res.body.data = updatedGameResponse;
        });
      }
    });
    cy.get('button').eq(1).click();
    cy.wait(1001)
    cy.get('.friends-games-container').should('be.empty');
  });



  //refetches
  //before --- after


})