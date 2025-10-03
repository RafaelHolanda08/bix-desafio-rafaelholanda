describe('Successful coupon application scenarios', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrlAddress'));
        cy.LoginUser(Cypress.env('validUserName'), Cypress.env('validPassword'));
    });

    it('Percentage coupon should apply correct discount to single product', () => {
        const productName = 'Mouse';
        const quantity = 1;
        const couponCode = 'SAVE20';
        const couponIsFixed = false;
        const couponValue = 20;

        cy.AddProductsToCartAndReturnPrice(productName, quantity).then((totalCartValue) => {
            ApplyCoupon(couponCode);
            ValidateCouponApplication(totalCartValue, couponValue, couponIsFixed);
        });
    });

    it('Percentage coupon should apply correct discount to multiple products', () => {
        const firstProductName = 'Mouse';
        const secondProductName = 'Keyboard';
        const firstProductQty = 5;
        const secondProductQty = 5;
        const couponIsFixed = false;
        const couponCode = 'WELCOME10';
        const couponValue = 10;

        cy.AddProductsToCartAndReturnPrice(firstProductName, firstProductQty).then((mouseTotal) => {
            cy.AddProductsToCartAndReturnPrice(secondProductName, secondProductQty, mouseTotal).then((totalCartValue) => {
                ApplyCoupon(couponCode);
                ValidateCouponApplication(totalCartValue, couponValue, couponIsFixed);
            });
        });
    });

    it('Fixed coupon should apply correct discount to single product', () => {
        const productName = 'Mouse';
        const quantity = 1;
        const couponValue = 50;
        const couponIsFixed = true;
        const couponCode = 'FIXED50';

        cy.AddProductsToCartAndReturnPrice(productName, quantity).then((totalCartValue) => {
            ApplyCoupon(couponCode);
            ValidateCouponApplication(totalCartValue, couponValue, couponIsFixed);
        });
    });

    it('Fixed coupon should apply correct discount to multiple products', () => {
        const firstProductName = 'Mouse';
        const secondProductName = 'Keyboard';
        const firstProductQty = 3;
        const secondProductQty = 2;
        const couponIsFixed = true;
        const couponCode = 'FIXED50';
        const couponValue = 50;

        cy.AddProductsToCartAndReturnPrice(firstProductName, firstProductQty).then((mouseTotal) => {
            cy.AddProductsToCartAndReturnPrice(secondProductName, secondProductQty, mouseTotal).then((totalCartValue) => {
                ApplyCoupon(couponCode);
                ValidateCouponApplication(totalCartValue, couponValue, couponIsFixed);
            });
        });
    });
});


describe('Alternative Coupon Scenarios', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrlAddress'));
        cy.LoginUser(Cypress.env('validUserName'), Cypress.env('validPassword'));
    });

    it('Applying a expired coupon should not be allowed', () => {
        const couponCode = 'EXPIRED';
        const productName = 'Mouse';
        const quantity = 1;

        cy.AddProductsToCartAndReturnPrice(productName, quantity).then((totalCartValue) => {
            ApplyCoupon(couponCode);
            cy.get('#coupon-message').should('be.visible').and('have.text', 'Coupon is expired');
            cy.ValidateOrderSumaryAndCartTotal(totalCartValue, quantity);
        });
    });

    it('Ignores repeated application of the same coupon', () => {    
        const productName = 'Mouse';
        const quantity = 1;
        const couponCode = 'SAVE20';
        const couponIsFixed = false;
        const couponValue = 20;

        cy.AddProductsToCartAndReturnPrice(productName, quantity).then((totalCartValue) => {
            ApplyCoupon(couponCode);
            ApplyCoupon(couponCode);
            ValidateCouponApplication(totalCartValue, couponValue, couponIsFixed);
        });
    });

    it('Applies only the last coupon when multiple coupons are entered', () => {    
        const productName = 'Mouse';
        const quantity = 1;
        const firstCouponCode = 'SAVE20';        
        const secondCouponCode = 'FIXED50';
        const secondCouponIsFixed = true;
        const secondCouponValue = 50;

        cy.AddProductsToCartAndReturnPrice(productName, quantity).then((totalCartValue) => {
            ApplyCoupon(firstCouponCode);            
            ApplyCoupon(secondCouponCode);
            ValidateCouponApplication(totalCartValue, secondCouponValue, secondCouponIsFixed);
        });
    });

});


function CalculateDiscountedPrice(orderTotal, discountValue, isFixed) {
    let finalPrice;
    const orderNumericValue = parseFloat(orderTotal.replace(',', '.'));
    if (isFixed) {
        finalPrice = orderNumericValue - discountValue;
    } else {
        finalPrice = orderNumericValue * (1 - (discountValue / 100));
    }
    finalPrice = (Math.round(finalPrice * 100)) / 100;
    return finalPrice.toFixed(2).replace('.', ',');
}

function ApplyCoupon(couponCode) {
    cy.get('#coupon-code').clear().type(couponCode);
    cy.get('#apply-coupon-btn').click();
}

function ValidateCouponApplication(totalCartValue, couponValue, couponIsFixed) {
    const expectedTotal = CalculateDiscountedPrice(totalCartValue, couponValue, couponIsFixed);
    cy.get('#final-total').should('have.text', expectedTotal);
    cy.get('#checkout-btn').click();
    cy.ValidateCheckoutResultTotal(expectedTotal);
}


