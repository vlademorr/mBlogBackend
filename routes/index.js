const registerUser = require('./registerUser');
const getAuthenteficatedUser = require('./getAuthenteficatedUser');
const userIsAuthenteficated = require('../middleware/userIsAuthenteficated');

const routes = (app) => {
    app.use('/', registerUser())
    app.use('/', userIsAuthenteficated, getAuthenteficatedUser())
};

module.exports = routes;