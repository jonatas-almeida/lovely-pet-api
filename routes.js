const express =  require('express');
const routes = express.Router();
const userController = require('./src/controllers/UserController');

/**
 *  Routes come here!
 */

// ------ User endpoints ------ //
// Register user
routes.post('/api/register_user', userController.register);
// Login user
routes.post('/api/login_user', userController.login);
// Update user
routes.put('/api/update_user', userController.updateUser);
// Delete user
routes.delete('/api/delete_user', userController.deleteUser);

module.exports = routes;