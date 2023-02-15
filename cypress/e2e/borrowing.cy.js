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
  updatedGameResponse, 
  getRandyUserDataBorrowAFTER,
  updatedGameResponseReturn
} from "../fixtures/fixture-borrowing"


describe('Seeing Games', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/`);
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.on('response', (res) => {
          res.body.data = getRandyUserDataBorrow;
        });
      } else if (hasOperationName(req, 'GetAllUsers')) {
        req.alias = 'gqlGetAllUsersQuery';
        req.on('response', (res) => {
          console.log('res: ', res);
          res.body.data = getAllUsersDataBorrow;
        });
      }
    });
    cy.get('.username-input')
      .type('randy');
    cy.get('.enter-site-button')
      .click()
  });

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
});


describe('Borrowing Games', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/`);
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.on('response', (res) => {
          res.body.data = getRandyUserDataBorrow;
        });
      } else if (hasOperationName(req, 'GetAllUsers')) {
        req.alias = 'gqlGetAllUsersQuery';
        req.on('response', (res) => {
          // console.log('res: ', res);
          res.body.data = getAllUsersDataBorrow;
        });
      }
    });
    cy.get('.username-input')
      .type('randy');
    cy.get('.enter-site-button')
      .click();
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
  });

  it('Should be able to click on their friends game to see a modal pop up', () => {
    cy.get('.game-modal').should('be.visible');
    cy.contains('Village');
  });

  it('Should have a button that says "Borrow" that borrows the game', () => {
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
          res.body.errors = [];
        });
      }
    });
    cy.get('button').eq(1).click();
    cy.wait(1001)
    cy.get('.friends-games-container').should('be.empty');
  });

  it('Should see the game in their borrowed games area', () => {
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser') && req.body.query.split('"').includes('honey')) {
        req.alias = 'gqlGetUserQuery';
        req.reply((res) => {
          res.body.data = getHoneyUserDataBorrowAFTER;
        });
      } else if (hasOperationName(req, 'GetUser') && req.body.query.split('"').includes('randy')) {
        req.alias = 'gqlGetUserQuery';
        req.reply((res) => {
          res.body.data = getRandyUserDataBorrowAFTER;
        });
      } else if (hasOperationName(req, 'UpdateUserGame')) {
        req.alias = 'gqlUpdateUserGameMutation';
        req.reply((res) => {
          res.body.data = updatedGameResponse;
          res.body.errors = [];
        });
      }
    });
    cy.get('button').eq(1).click();
    cy.wait(1001);
    cy.get('button').eq(1).click();
    cy.get('.single-game-name').eq(0)
      .should('have.text', 'Village')
    cy.get('p').eq(0)
      .should('have.text', 'Borrowing from honey');
    cy.get('.single-game-img').eq(0)
      .should('have.attr', 'src')
      .should('eq', 'https://m.media-amazon.com/images/I/61XkXWPpGWL.jpg')
  });
});


describe('Returning Games', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/`);
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.on('response', (res) => {
          res.body.data = getRandyUserDataBorrowAFTER;
        });
      } else if (hasOperationName(req, 'GetAllUsers')) {
        req.alias = 'gqlGetAllUsersQuery';
        req.on('response', (res) => {
          res.body.data = getAllUsersDataBorrow;
        });
      }
    });
    cy.get('.username-input')
      .type('randy');
    cy.get('.enter-site-button')
      .click()
  });

  it('Should have a borrowed game', () => {
    cy.get('.single-game-name').eq(0)
      .should('have.text', 'Village');
    cy.get('p').eq(0)
      .should('have.text', 'Borrowing from honey');
    cy.get('.single-game-img').eq(0)
      .should('have.attr', 'src')
      .should('eq', 'https://m.media-amazon.com/images/I/61XkXWPpGWL.jpg');
  });

  it('Should be able to click on their friends game to see a modal pop up', () => {
    cy.get('.borrowed-games-collection')
      .find('.single-game-img').click();
    cy.get('.game-modal').should('be.visible');
    cy.contains('Village');
  });

  it('Should have return button that returns the game', () => {
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.reply((res) => {
          console.log('PING');
          res.body.data = getRandyUserDataBorrow;
        });
      } 
      if (hasOperationName(req, 'UpdateUserGame')) {
        req.alias = 'gqlUpdateUserGameMutation';
        req.reply((res) => {
          res.body.data = updatedGameResponseReturn;
          res.body.errors = [];
        });
      }
    });
    cy.get('.borrowed-games-collection')
      .find('.single-game-img').click();
    cy.get('button').eq(1).should('have.text', `Return Friend's Game`)
    cy.get('button').eq(1).click();
    cy.wait(1001);
    cy.get('.borrowed-games-collection').should('be.empty')
  });

  it('Should be able to see the game back in users friends page after returning it', () => {
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.reply((res) => {
          res.body.data = getRandyUserDataBorrow;
        });
      } 
      if (hasOperationName(req, 'UpdateUserGame')) {
        req.alias = 'gqlUpdateUserGameMutation';
        req.reply((res) => {
          res.body.data = updatedGameResponse;
          res.body.errors = [];
        });
      }
    });
    cy.get('.borrowed-games-collection')
      .find('.single-game-img').click();
    cy.get('button').eq(1).click();
    cy.wait(1001);
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.reply((res) => {
          res.body.data = getHoneyUserDataBorrow;
        });
      }
    });
    cy.get('.friend').click()
    cy.get('.friends-games-container')
      .find('.single-game-img');
    cy.get('.friends-games-container')
      .should('have.text', 'Village')
  });
});

describe('User Seeing That Their Game Is Borrowed', () => {
  it('Should see their game without a grey overlay if theyre not borrowed', () => {
    cy.visit(`http://localhost:3000/`);
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.on('response', (res) => {
          res.body.data = getHoneyUserDataBorrow;
        });
      } else if (hasOperationName(req, 'GetAllUsers')) {
        req.alias = 'gqlGetAllUsersQuery';
        req.on('response', (res) => {
          console.log('res: ', res);
          res.body.data = getAllUsersDataBorrow;
        });
      }
    });
    cy.get('.username-input')
      .type('honey');
    cy.get('.enter-site-button')
      .click()
    cy.get('.single-game-img');
  });

  it('When a friend borrows their game, user should see it with a grey overlay', () => {
    cy.visit(`http://localhost:3000/`);
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.on('response', (res) => {
          res.body.data = getRandyUserDataBorrow;
        });
      } else if (hasOperationName(req, 'GetAllUsers')) {
        req.alias = 'gqlGetAllUsersQuery';
        req.on('response', (res) => {
          res.body.data = getAllUsersDataBorrow;
        });
      }
    });
    cy.get('.username-input').type('randy');
    cy.get('.enter-site-button').click();
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.reply((res) => {
          res.body.data = getHoneyUserDataBorrow;
        });
      } else if (hasOperationName(req, 'UpdateUserGame')) {
        req.alias = 'gqlUpdateUserGameMutation';
        req.reply((res) => {
          res.body.data = updatedGameResponse;
          res.body.errors = [];
        });
      }
    });
    cy.get('.friend').click();
    cy.get('.single-game-img').click();
    cy.get('button').eq(1).click();
    cy.intercept('POST', 'https://board-together.herokuapp.com/graphql', (req) => {
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery';
        req.reply((res) => {
          res.body.data = getHoneyUserDataBorrowAFTER;
        });
      } 
    });
    cy.wait(1001);
    cy.get('button').eq(1).click();
    cy.go('back');
    cy.go('back');
    cy.go('back');
    cy.get('.username-input').type('honey');
    cy.get('.enter-site-button').click();
    cy.get('.single-borrowed-game')
  });

})