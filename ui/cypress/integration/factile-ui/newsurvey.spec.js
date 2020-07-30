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

    describe('Basic details', () => {

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

    describe('Questionnaire', () => {
        beforeEach(() => {
            cy.route({
                url: '/api/surveys/abcd-xyz-123456',
                method: 'GET',
                response: {surveyId: 'abcd-xyz-123456', name: 'Test survey', status: 'Draft', history: { created_at: new Date(), created_by: 'a@test.com' }}
            }).as('thisSurvey');

            cy.route({
                url: '/api/surveys/abcd-xyz-123456',
                method: 'PUT',
                response: {surveyId: 'abcd-xyz-123456' }
            }).as('updatethisSurvey');

            cy.visit('/surveys/abcd-xyz-123456/questions');
            cy.wait('@thisSurvey');
            cy.get('[data-testid="survey-title"]').should('have.text', 'Test survey');
        });

        it('should successfully add a radio button question to a survey', () => {
            // click the add questions button
            cy.get('[data-testid="btn-add-questions-0"]').click();
            // select "single choice" question
            cy.get('[data-testid="add-questions-0-option-radio"]').click();

            cy.get('[data-testid="question-block-q1"] h4').should('have.text', 'Single Choice');
            cy.get('[data-testid="question-block-q1"] input[name="text"]').type('Howzat?', { delay: 100 });
            cy.get('[data-testid="question-block-q1"] textarea[name="options"]').type('Out\nNot Out\nRefer', { delay: 100 });
            cy.get('#label-q1-mandatory').click();
            cy.get('[data-testid="btn-save-details-0"]').click();
            cy.wait('@updatethisSurvey');
        });

        it('should successfully add a dropdown question to a survey', () => {
            // click the add questions button
            cy.get('[data-testid="btn-add-questions-0"]').click();
            // select "single choice" question
            cy.get('[data-testid="add-questions-0-option-dropdown"]').click();

            cy.get('[data-testid="question-block-q1"] h4').should('have.text', 'Dropdown');
            cy.get('[data-testid="question-block-q1"] input[name="text"]').type('Howzat?', { delay: 100 });
            cy.get('[data-testid="question-block-q1"] textarea[name="options"]').type('Out\nNot Out\nRefer', { delay: 100 });
            cy.get('#label-q1-mandatory').click();
            cy.get('[data-testid="btn-save-details-0"]').click();
            cy.wait('@updatethisSurvey');
        });

        it('should successfully add a checkbox question to a survey', () => {
            // click the add questions button
            cy.get('[data-testid="btn-add-questions-0"]').click();
            // select "single choice" question
            cy.get('[data-testid="add-questions-0-option-checkbox"]').click();

            cy.get('[data-testid="question-block-q1"] h4').should('have.text', 'Multiple Choice');
            cy.get('[data-testid="question-block-q1"] input[name="text"]').type('Howzat?', { delay: 100 });
            cy.get('[data-testid="question-block-q1"] textarea[name="options"]').type('Out\nNot Out\nRefer', { delay: 100 });
            cy.get('#label-q1-mandatory').click();
            cy.get('[data-testid="btn-save-details-0"]').click();
            cy.wait('@updatethisSurvey');
        });

        it('should successfully add a ranking question to a survey', () => {
            // click the add questions button
            cy.get('[data-testid="btn-add-questions-0"]').click();
            // select "single choice" question
            cy.get('[data-testid="add-questions-0-option-ranking"]').click();

            cy.get('[data-testid="question-block-q1"] h4').should('have.text', 'Ranking');
            cy.get('[data-testid="question-block-q1"] input[name="text"]').type('Howzat?', { delay: 100 });
            cy.get('[data-testid="question-block-q1"] textarea[name="options"]').type('Out\nNot Out\nRefer', { delay: 100 });
            cy.get('#label-q1-mandatory').click();
            cy.get('[data-testid="btn-save-details-0"]').click();
            cy.wait('@updatethisSurvey');
        });

        it('should successfully add a rating question to a survey', () => {
            // click the add questions button
            cy.get('[data-testid="btn-add-questions-0"]').click();
            // select "single choice" question
            cy.get('[data-testid="add-questions-0-option-rating"]').click();

            cy.get('[data-testid="question-block-q1"] h4').should('have.text', 'Rating Scale');
            cy.get('[data-testid="question-block-q1"] input[name="text"]').type('Umpiring', { delay: 100 });
            cy.get('[data-testid="question-block-q1"] textarea[name="options"]').type('Out\nNot Out\nRefer', { delay: 100 });
            cy.get('[data-testid="question-block-q1"] textarea[name="dimensions"]').type('Howzat\nWhat do you say?', { delay: 100 });
            cy.get('#label-q1-mandatory').click();
            cy.get('[data-testid="btn-save-details-0"]').click();
            cy.wait('@updatethisSurvey');
        });

        it('should successfully add a textbox question to a survey', () => {
            // click the add questions button
            cy.get('[data-testid="btn-add-questions-0"]').click();
            // select "single choice" question
            cy.get('[data-testid="add-questions-0-option-textbox"]').click();

            cy.get('[data-testid="question-block-q1"] h4').should('have.text', 'Text Field');
            cy.get('[data-testid="question-block-q1"] input[name="text"]').type('Howzat?', { delay: 100 });
            cy.get('#label-q1-mandatory').click();
            cy.get('[data-testid="btn-save-details-0"]').click();
            cy.wait('@updatethisSurvey');
        });

        it('should successfully add a textarea question to a survey', () => {
            // click the add questions button
            cy.get('[data-testid="btn-add-questions-0"]').click();
            // select "single choice" question
            cy.get('[data-testid="add-questions-0-option-textarea"]').click();

            cy.get('[data-testid="question-block-q1"] h4').should('have.text', 'Large Text/ Essay');
            cy.get('[data-testid="question-block-q1"] input[name="text"]').type('Howzat?', { delay: 100 });
            cy.get('#label-q1-mandatory').click();
            cy.get('[data-testid="btn-save-details-0"]').click();
            cy.wait('@updatethisSurvey');
        });

        it('should successfully add a plain text question to a survey', () => {
            // click the add questions button
            cy.get('[data-testid="btn-add-questions-0"]').click();
            // select "single choice" question
            cy.get('[data-testid="add-questions-0-option-plaintext"]').click();

            cy.get('[data-testid="question-block-q1"] h4').should('have.text', 'Plain Text');
            cy.get('[data-testid="question-block-q1"] input[name="text"]').type('Howzat?', { delay: 100 });
            cy.get('[data-testid="btn-save-details-0"]').click();
            cy.wait('@updatethisSurvey');
        });

        it('should successfully add multiple questions to a survey', () => {
            // click the add questions button
            cy.get('[data-testid="btn-add-questions-0"]').click();
            // select "single choice" question
            cy.get('[data-testid="add-questions-0-option-plaintext"]').click();

            cy.get('[data-testid="question-block-q1"] h4').should('have.text', 'Plain Text');
            cy.get('[data-testid="question-block-q1"] input[name="text"]').type('Howzat?', { delay: 100 });

            // click the add questions button
            cy.get('[data-testid="btn-add-questions-0"]').click();
            // select "single choice" question
            cy.get('[data-testid="add-questions-0-option-page"]').click();

            // click the add questions button
            cy.get('[data-testid="btn-add-questions-0"]').click();
            // select "single choice" question
            cy.get('[data-testid="add-questions-0-option-textarea"]').click();

            cy.get('[data-testid="question-block-q3"] h4').should('have.text', 'Large Text/ Essay');
            cy.get('[data-testid="question-block-q3"] input[name="text"]').type('Howzat?', { delay: 100 });
            cy.get('#label-q3-mandatory').click();

            cy.get('[data-testid="btn-save-details-0"]').click();
            cy.wait('@updatethisSurvey');
        });

        it('should delete question', () => {
            // click the add questions button
            cy.get('[data-testid="btn-add-questions-0"]').click();
            // select "single choice" question
            cy.get('[data-testid="add-questions-0-option-plaintext"]').click();

            cy.get('[data-testid="question-block-q1"] h4').should('have.text', 'Plain Text');
            cy.get('[data-testid="question-block-q1"] input[name="text"]').type('Howzat?', { delay: 100 });

            cy.get('[data-testid="question-block-q1"] .delete-btn').click();

            cy.get('[data-testid="question-block-q1"]').should('not.exist');
            // delete will call update as well
            cy.wait('@updatethisSurvey');
        });
    });

});