const emailTemplates = require('../../lib/email-templates');
const { expectation } = require('sinon');

describe('email template tests', () => {

    test('build any template', done => {
        const content = emailTemplates.build('newUser', {});
        expect(content).not.toBeUndefined();
        expect(content).not.toBeNull();
        expect(content.text).not.toBeUndefined();
        expect(content.text).not.toBeNull();
        expect(content.html).not.toBeUndefined();
        expect(content.html).not.toBeNull();
        done();
    });

    test('build a template and replace variables', done => {
        const newPass = 'SuperS3cr3T';
        const content = emailTemplates.build('forgotPassword', { newPass });
        expect(content).not.toBeUndefined();
        expect(content).not.toBeNull();
        expect(content.text).not.toBeUndefined();
        expect(content.text).not.toBeNull();
        expect(content.html).not.toBeUndefined();
        expect(content.html).not.toBeNull();
        expect(content.text.indexOf(newPass)).not.toBe(-1);
        expect(content.html.indexOf(newPass)).not.toBe(-1);
        done();
    });
});