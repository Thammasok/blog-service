const server = require('../server');
const request = require('supertest').agent(server);

module.exports = request;