const db = require('../db');

const findByOwner = (owner) => db.findOne('addressbooks', { owner }, { groups: 1 });

const findGroupsByOwner = (owner) => findByOwner(owner).then(d => (d.groups || []).map(g => g.name));

const findAddressesByOwnerAndGroup = (owner, group) => findByOwner(owner).then(d => ((d.groups || []).find(g => g.name === group) || {}).addresses || []);

const saveOrUpdate = (owner, addressBook) => db.save('addressbooks', { ...addressBook, owner }, 'owner');

module.exports = { findByOwner, findGroupsByOwner, findAddressesByOwnerAndGroup, saveOrUpdate };