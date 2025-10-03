//Example of Unit tests for Logout functionality

describe('LogOut Tests', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrlAddress'))
    cy.LoginUser(Cypress.env('validUserName'), Cypress.env('validPassword'))
  });

  it('Clears token from local storage after logou', () => {
    cy.get('#logout-btn').click();
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      expect(token).to.be.null;
    });
  })

  it('Hides user name after logout', () => {
    cy.get('#logout-btn').click();
    cy.get('#user-name').should('not.be.visible');
  })

  it('Hides logout button after logout', () => {
    cy.get('#logout-btn').click();
    cy.get('#logout-btn').should('not.be.visible');
  })

})