const jwt = require('jsonwebtoken');

describe('New Survey Test', () => {
    beforeEach(() => {
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

        // click on header to ensure linkage
        cy.get('[data-testid="new-survey-nav-link"').click();
    });

    it('should create a survey successfully', () => {
        cy.route({
            url: '/api/surveys',
            method: 'POST',
            response: { surveyId: 'abcd-xyz-123456' }
        }).as('newsurvey');

        cy.route({
            url: '/api/surveys/abcd-xyz-123456',
            method: 'GET',
            response: {surveyId: 'abcd-xyz-123456', name: 'Test survey', status: 'Draft', history: { created_at: new Date(), created_by: 'a@test.com' }}
        }).as('thisSurvey');

        cy.get('#survey-name').type('Test survey', { delay: 100 });
        cy.get('[data-testid="openAccess"]').click();
        cy.get('[data-testid="leftPos"]').click();

        cy.get('#save-details').click();
        cy.wait('@newsurvey');
        cy.wait('@thisSurvey');
        cy.get('[data-testid="survey-title"]').should('have.text', 'Test survey');
    });

    it('should not create a survey with basic details missing', () => {
        cy.get('#save-details').click();
        cy.get('#errorMessage').should('have.text', 'Please provide a survey name');
    });

  });