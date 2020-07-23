const pug = require('pug');
const fs = require('fs');
const ProjectData = require('../apidoc/api_project.json');
const APIData = require('../apidoc/api_data.json');

const consolidate = (grouped, item) => {
    grouped[item.groupTitle] = grouped[item.groupTitle] || [];
    grouped[item.groupTitle].push(item);
    return grouped;
};
const groupedAPI = APIData.reduce(consolidate, {});
const flattenedAndGroupedAPI = Object.keys(groupedAPI).map(k => ({
    group: k,
    data: groupedAPI[k]
}));

const html = pug.compileFile(__dirname + '/template/layout.pug')({ project: ProjectData, api: flattenedAndGroupedAPI });

fs.writeFile(__dirname + `/dist/index.html`, html, 'utf8', () => {});
