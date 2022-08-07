const express =  require('express');
const routes = express.Router();
const userController = require('./src/controllers/UserController');

/**
 *  Routes come here!
 */

// ------ User endpoints ------ //
routes.post('/api/register_user', userController.register);

module.exports = routes;