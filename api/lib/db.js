const mongodb = require('mongodb');
const { MongoClient } = mongodb;
const assert = require('assert');
const { config } = require('./config.js');

// Connection URL
const url = config.db.url;

// Database Name
const dbName = config.db.name;

/**
 * Connect to the database
 * 
 * private function to be used only inside this file
 * 
 * @returns promise which resolves into a client object
 */
const connect = () => {
    // Create a new MongoClient
    const client = new MongoClient(url, { useUnifiedTopology: config.db.useUnifiedTopology });

    // Use connect method to connect to the Server
    return new Promise(resolve => {
        client.connect(function(err) {
            assert.equal(null, err);
            resolve(client);
        });
    });
};

/**
 * Close the connection to the database
 * 
 * private function to be used only inside this file
 * 
 * @returns undefined
 */
const close = (client) => {
    client.close();
};

/**
 * Get collection object from the client
 */
const getCollection = (client, collectionName) => client.db(dbName).collection(collectionName);

/**
 * Base function to query the database
 * 
 * private function to be used only inside this file
 * 
 * @returns promise which resolves into query results
 */
const _find = (client, collectionName, query, sort, projection, limit) => {
    const collection = getCollection(client, collectionName);

    return new Promise(resolve => {
        collection.find(query, { sort, projection, limit }).toArray((err, data) => {
            assert.equal(err, null);

            close(client);
            resolve(data);
          });
    });
};

/**
 * Base function to query the database for exactly one object
 * 
 * private function to be used only inside this file
 * 
 * @returns promise which resolves into query results
 */
const _findOne = (client, collectionName, query, projection) => {
    const collection = getCollection(client, collectionName);

    return new Promise(resolve => {
        collection.findOne(query, { projection }, ((err, data) => {
            assert.equal(err, null);

            close(client);
            resolve(data);
          }));
    });
};

/**
 * List all objects in the given collection. Should be used with caution!
 * 
 * @returns promise which resolves into query results
 */
const list = async (collectionName) => {
    return connect().then(client => _find(client, collectionName));
};

/**
 * List all objects in the given collection that match the given criteria
 * 
 * @returns promise which resolves into query results
 */
const find = async (collectionName, query, sort = {}, projection = {}, limit = 0) => {
    return connect().then(client => _find(client, collectionName, query, sort, projection, limit));
};

/**
 * Find exactly one object that matches the given criteria
 * 
 * @returns promise which resolves into query results
 */
const findOne = async (collectionName, query, projection = {}) => {
    return connect().then(client => _findOne(client, collectionName, query, projection));
};

const saveOrUpdate = (client, collectionName, data, key) => {
    const collection = getCollection(client, collectionName);

    const query = {};
    query[key] = data[key];

    return new Promise(async (resolve) => {
        await collection.replaceOne(query, data, { upsert: true });

        let result = {};
        result[key] = data[key];

        close(client);
        resolve(result);
    });
};

const save = async (collectionName, data, key) => {
    return connect().then((client) => saveOrUpdate(client, collectionName, data, key));
};

const del = async (collectionName, filters) => {
    if (!filters || !Object.keys(filters).length) {
        throw Error('can not delete all documents without a specified filter');
    }

    return connect().then(async client => {
        const collection = getCollection(client, collectionName);
        await collection.deleteMany(filters);
        close(client);
        return { message: 'OK' };
    });
};

module.exports = { list, find, findOne, save, del };
