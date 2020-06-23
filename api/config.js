const config = {
    server: {
        port: process.env.FACTILE_SERVER_PORT || '9000'
    },
    db: {
        name: process.env.FACTILE_DB_NAME || 'factile',
        url: process.env.FACTILE_DB_URL || 'mongodb://localhost:27017',
        useUnifiedTopology: true
    }
};

module.exports = { config };