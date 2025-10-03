const resetedCartValue = '0,00';
const resetedCartTotalItems = '0';

describe('Checkout Scenarios', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrlAddress'));
  });

  it('Checking out should reset the cart', () => {    
    const productName = 'Mouse';
    const quantity = 1;
    
    cy.AddProductsToCart(productName, quantity).then(() => {
      cy.LoginUser(Cypress.env('validUserName'), Cypress.env('validPassword'));
      cy.get('#checkout-btn').click();
      
      cy.ValidateOrderSumaryAndCartTotal(resetedCartValue, resetedCartTotalItems);
    });
  });

  it('Checking out without login should not be allowed', () => {    
    const productName = 'Mouse';
    const quantity = 1;

    cy.AddProductsToCart(productName, quantity);    
    cy.get('#checkout-btn').click();
    
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Faça login para finalizar a compra');
    });
  });


  it('Checking out after logout should not be allowed', () => {    
    const productName = 'Mouse';
    const quantity = 1;

    cy.LoginUser(Cypress.env('validUserName'), Cypress.env('validPassword'));
    cy.AddProductsToCart(productName, quantity);    
    cy.get('#logout-btn').click();
    cy.get('#checkout-btn').click();
    
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Faça login para finalizar a compra');
    });
  });
});