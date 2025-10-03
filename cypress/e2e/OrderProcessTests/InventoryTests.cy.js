describe('Inventory Update Scenarios', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrlAddress'));
        cy.LoginUser(Cypress.env('validUserName'), Cypress.env('validPassword'));
    });

    it('Stock should update after checking out', () => {        
        const productName = 'Mouse';
        const quantity = 1;
        cy.GetQuantityByProductName(productName).then((initialStock) => {            
            cy.AddProductsToCart(productName, quantity);
            cy.get('#checkout-btn').click();
            
            cy.GetQuantityByProductName(productName).should('eq', initialStock - quantity);
        });
    });

    it('Stock should update after checking out and reloading the page', () => {        
        const productName = 'Keyboard';
        const quantity = 1;

        cy.GetQuantityByProductName(productName).then((initialStock) => {            
            cy.AddProductsToCart(productName, quantity);
            cy.get('#checkout-btn').click();
            cy.reload();
            
            cy.GetQuantityByProductName(productName).should('eq', initialStock - quantity);
        });
    });

    it('Add to cart button should be unavailable after buying all products', () => {
        const productName = 'Headset';
        AddAllAvailableStockToCart(productName);

        cy.GetProductByName(productName).find('button').should('be.disabled');
    });
});

function AddAllAvailableStockToCart(productName) {
    cy.GetQuantityByProductName(productName).then((stock) => {
        if (stock > 0) {
            cy.AddProductsToCart(productName, stock);
            cy.get('#checkout-btn').click();
            cy.reload();
        }
    });
}