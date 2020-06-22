const express = require('express');
const { config } = require('./config.js');
const app = express()
const port = 9000

app.get('/', (req, res) => res.send('OK'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${config.server.port}`))
