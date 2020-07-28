const jwt = require('jsonwebtoken');

describe('Login Test', () => {
    it('should login a user successfully', () => {
      cy.server();

      cy.route({
        url: '/api/login',
        method: 'POST',
        response: { token: jwt.sign('abcd', 'factile secret') }
      }).as('login');

      cy.route({
        url: '/api/surveys',
        method: 'GET',
        response: [{surveyId: '1234', name: 'Test', status: 'Draft', history: { created_at: new Date(), created_by: 'a@test.com' }}]
      }).as('mysurveys');

      cy.visit('/');
      cy.get('#email').type('a@test.com', { delay: 100 });
      cy.get('#password').type('password', { delay: 100 });
      cy.get('[data-testid="login-btn"]').click();

      cy.wait('@login');
      cy.wait('@mysurveys');
    });

    it('should fail login for bad credentials', () => {
      cy.server();

      cy.route({
        url: '/api/login',
        method: 'POST',
        response: {}
      }).as('login');

      cy.visit('/');
      cy.get('#email').type('a@test.com');
      cy.get('#password').type('password');
      cy.get('[data-testid="login-btn"]').click();

      cy.wait('@login');

      cy.get('[data-testid="login-error"]').should('have.text', 'Login failed');
    });

    it('should ensure that email is input before submission to API', () => {
      cy.visit('/');
      cy.get('#password').type('password');
      cy.get('[data-testid="login-btn"]').click();
      cy.get('[data-testid="login-error"]').should('have.text', 'Please enter a valid email address and password');
    });

    it('should ensure that a syntactically valid email is input before submission to API', () => {
      cy.visit('/');
      cy.get('#email').type('testuser');
      cy.get('#password').type('password');
      cy.get('[data-testid="login-btn"]').click();
      cy.get('[data-testid="login-error"]').should('have.text', 'Please enter a valid email address and password');
    });

    it('should ensure that password is input before submission to API', () => {
      cy.visit('/');
      cy.get('#email').type('a@test.com');
      cy.get('[data-testid="login-btn"]').click();
      cy.get('[data-testid="login-error"]').should('have.text', 'Please enter a valid email address and password');
    });
  });