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
            // console.log("Connected successfully to server");
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
 * Base function to query the database
 * 
 * private function to be used only inside this file
 * 
 * @returns promise which resolves into query results
 */
const _find = (client, collectionName, query, sort, projection, limit) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    return new Promise(resolve => {
        collection.find(query, { sort, projection, limit }).toArray((err, data) => {
            assert.equal(err, null);
            console.log(`Found ${data.length} records`);

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
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

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
}

/**
 * List all objects in the given collection that match the given criteria
 * 
 * @returns promise which resolves into query results
 */
const find = async (collectionName, query, sort = {}, projection = {}, limit = 0) => {
    return connect().then(client => _find(client, collectionName, query, sort, projection, limit));
}

/**
 * Find exactly one object that matches the given criteria
 * 
 * @returns promise which resolves into query results
 */
const findOne = async (collectionName, query, projection = {}) => {
    return connect().then(client => _findOne(client, collectionName, query, projection));
}

module.exports = { list, find, findOne };