// EndToEnd Test Examples for Shopping Cart - Managing Products
describe('Adding products to cart', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrlAddress'))
  });

  it('Allows adding a product to the cart before login', () => {
    const productName = 'Keyboard';
    const quantity = 1;

    cy.AddProductsToCartAndReturnPrice(productName, quantity).then((totalCartValue) => {
      cy.ValidateOrderSumaryAndCartTotal(totalCartValue, quantity);
    });
  })

  it('Allows adding a product to the cart after login', () => {
    const productName = 'Keyboard';
    const quantity = 1;
    cy.LoginUser(Cypress.env('validUserName'), Cypress.env('validPassword'))

    cy.AddProductsToCartAndReturnPrice(productName, quantity).then((totalCartValue) => {
      cy.ValidateOrderSumaryAndCartTotal(totalCartValue, quantity);
    });
  })

  it('Allows adding multiple units of a product to the cart', () => {
    const productName = 'Keyboard';
    const quantity = 3;

    cy.AddProductsToCartAndReturnPrice(productName, quantity).then((totalCartValue) => {
      cy.ValidateOrderSumaryAndCartTotal(totalCartValue, quantity);
    });
  })

  it('Allows adding different products to the cart', () => {
    const firstProductName = 'Keyboard';
    const secondProductName = 'Mouse';
    const firstProductQuantity = 3;
    const secondProductQuantity = 2;

    cy.AddProductsToCartAndReturnPrice(firstProductName, firstProductQuantity).then((firstTotal) => {
      cy.AddProductsToCartAndReturnPrice(secondProductName, secondProductQuantity, firstTotal).then((totalCartValue) => {
        cy.ValidateOrderSumaryAndCartTotal(totalCartValue, firstProductQuantity + secondProductQuantity);
      });
    })
  })

  it('Retains cart products after login', () => {
    const firstProductName = 'Keyboard';
    const secondProductName = 'Headset';
    const firstProductQuantity = 2;
    const secondProductQuantity = 3;

    cy.AddProductsToCartAndReturnPrice(firstProductName, firstProductQuantity).then((firstTotal) => {
      cy.AddProductsToCartAndReturnPrice(secondProductName, secondProductQuantity, firstTotal).then((totalCartValue) => {
        cy.LoginUser(Cypress.env('validUserName'), Cypress.env('validPassword'));
        cy.ValidateOrderSumaryAndCartTotal(totalCartValue, firstProductQuantity + secondProductQuantity);
      });
    })
  })
})

describe('Error Adding products to cart', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrlAddress'))
  });

  it('Cart Add Product Errors', () => {
    const productName = 'Keyboard';
    const quantity = 20;

    cy.GetQuantityByProductName(productName).then((availableQuantity) => {
      cy.AddProductsToCart(productName, quantity);
      cy.log(availableQuantity);
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Quantidade indisponível. Estoque: ' + availableQuantity);
      });
    });


  })
})