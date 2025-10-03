Cypress.Commands.add('LoginUser', (username='', password='') => {
  if(username!=='')cy.get('#email').type(username);
  if(password!=='')cy.get('#password').type(password);
  cy.get('#login-btn').click();
});

Cypress.Commands.add('GetProductByName', (productName) => {
  return cy.get('#product-list .product-info').contains(productName).closest('li');
});

Cypress.Commands.add('GetPriceByProductName', (productName) => {
    cy.GetProductByName(productName).invoke('text').then((text) => {
      const priceText = text.split('\n').filter(t => t.includes('R$'))[0].trim();      
      return priceText.split('R$')[1].trim();
    });
});

Cypress.Commands.add('GetQuantityByProductName', (productName) => {
    cy.GetProductByName(productName).find('span').invoke('text').then((text) => {
      const quantityText = text.split(':')[1].trim();
      return parseInt(quantityText);
    });
});

Cypress.Commands.add('AddProductsToCart', (productName, quantity) => {
    cy.GetProductByName(productName).find('input').clear().type(quantity);
    cy.GetProductByName(productName).find('button').click();    
});

Cypress.Commands.add('AddProductsToCartAndReturnPrice', (productName, quantity, cartStartingTotal = '0') => {
    cy.AddProductsToCart(productName, quantity);
    cy.GetPriceByProductName(productName).then((price) => {
      return CalculateCartTotal(price, quantity, cartStartingTotal);
    });
});

Cypress.Commands.add('ValidateOrderSumaryAndCartTotal', (expectedCartValue, expectedQuantity) => {
    cy.get('#final-total').should('have.text', expectedCartValue);
    cy.get('#subtotal').should('have.text', expectedCartValue);
    cy.get('#cart-total').should('have.text', expectedCartValue);
    cy.get('#cart-count').should('have.text', expectedQuantity);
});

Cypress.Commands.add('ValidateCheckoutResultTotal', (expectedTotal) => {
  cy.get('#result').invoke('text').then((json) => {
    const result = JSON.parse(json);
    expect(result.total).to.eq(ConvertBRLToNumber(expectedTotal));
  });
});

function CalculateCartTotal(addedProductPriceString, addedQuantity, cartStartingTotal) {
  const numericProductPrice = parseFloat(addedProductPriceString.replace(',', '.'));
  const cartNumericStartingTotal = parseFloat(cartStartingTotal.replace(',', '.'))
  const cartTotalNumber = (numericProductPrice * addedQuantity) + cartNumericStartingTotal;
  return cartTotalNumber.toFixed(2).replace('.', ',');
}

function ConvertBRLToNumber(value){
    return parseFloat(value.replace(',', '.'));
}