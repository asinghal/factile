const db = require('../../lib/db');
const addressbooks = require('../../lib/addressbooks');

const sinon = require('sinon');

describe('Addressbook model tests', () => {
    let mockDB;

    beforeEach(() => {
        mockDB = sinon.mock(db);
    });
    
    afterEach(() => {
        mockDB.verify();
        mockDB.restore();
    });

    test('findByOwner', done => {
        const email = 'a@a.com';
        const dummyAddressbook = { groups: [ { name: 'Default', addresses: [{ email }] } ]};
        mockDB.expects('findOne').once().resolves(dummyAddressbook);
    
        addressbooks.findByOwner(email).then(found => {
            expect(found.groups).not.toBeUndefined();
            expect(found.groups).not.toBeNull();
            expect(found).toBe(dummyAddressbook);
            done();
        });
    });

    test('findGroupsByOwner', done => {
        const email = 'a@a.com';
        const dummyAddressbook = { groups: [ { name: 'Default', addresses: [{ email }] }, { name: 'Private', addresses: [{ email }] } ]};
        mockDB.expects('findOne').once().resolves(dummyAddressbook);
    
        addressbooks.findGroupsByOwner(email).then(found => {
            expect(found.length).toBe(2);
            expect(found[0]).toBe('Default');
            expect(found[1]).toBe('Private');
            done();
        });
    });

    test('findAddressesByOwnerAndGroup', done => {
        const email = 'a@a.com';
        const dummyAddressbook = { groups: [ { name: 'Default', addresses: [{ email }] } ]};
        mockDB.expects('findOne').once().resolves(dummyAddressbook);
    
        addressbooks.findAddressesByOwnerAndGroup(email, 'Default').then(found => {
            expect(found.length).toBe(1);
            expect(found[0].email).toBe(email);
            done();
        });
    });

    test('save an addressbook', done => {
        const email = 'a@a.com';
        const addressbook = { owner: email, groups: [] };
        mockDB.expects('save').once().resolves("ok");

        addressbooks.saveOrUpdate(email, addressbook).then(d => {
            expect(d).toBe("ok");
            done();
        });
    });

});
