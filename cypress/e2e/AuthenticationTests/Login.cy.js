//Examples of UnitTesting for Login Functionality

describe('Successful Login Tests', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrlAddress'))
    cy.LoginUser(Cypress.env('validUserName'), Cypress.env('validPassword'))
  });

  it('Stores token in local storage after login', () => {
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      expect(token).to.not.be.null;
    });
  })

  it('Displays user name after login', () => {
    cy.get('#user-name').should('have.text', 'Regular User')
  })

  it('Shows logout button after login', () => {
    cy.get('#logout-btn').should('be.visible')
  })

})

describe('Error Login Tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrlAddress'))
  });

  it('Shows error for incorrect password', () => {
    const invalidPassword = 'user1234';
    cy.LoginUser(Cypress.env('validUserName'), invalidPassword)

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Invalid credentials');
    });

  })

  it('Shows error for incorrect email', () => {
    const invalidUserName = 'user2@test.com';
    cy.LoginUser(invalidUserName, Cypress.env('validPassword'))

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Invalid credentials');
    });

  })

  it('Shows error for empty email', () => {
    const emptyUserEmail = '';
    cy.LoginUser(emptyUserEmail, Cypress.env('validPassword'))
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Email and password are required');
    });
  })

  it('Shows error for empty password', () => {
    const emptyPassword = '';
    cy.LoginUser(Cypress.env('validUserName'), emptyPassword)
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Email and password are required');
    });
  })
})