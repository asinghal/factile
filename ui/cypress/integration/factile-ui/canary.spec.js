const jwt = require('jsonwebtoken');

describe('Canary Test', () => {
    it('should ensure that the set up is working', () => {
      cy.visit('/');
      cy.get('[data-testid="login-btn"]').should('have.text', 'Login');
    });
});