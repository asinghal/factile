const pug = require('pug');

const compileTemplate = (filePath) => pug.compileFile(__dirname + filePath);

const buildTemplates = (name) => ({
    html: compileTemplate(`/${name}/html.pug`),
    text: compileTemplate(`/${name}/text.pug`)
});

const templates = {
    newUser: buildTemplates('new-user'),
    forgotPassword: buildTemplates('forgot-password'),
    changePassword: buildTemplates('change-password'),
    invite: buildTemplates('invite'),
};

const build = (templateName, context) => {
    const tpl = templates[templateName];
    return {
        html: tpl.html(context),
        text: tpl.text(context)
    };
};

module.exports = { build };