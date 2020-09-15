module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Display all users
    app.get('/users', users.findAll);

    // Create a new user
    app.post('/users', users.create);

    // find one user
    app.get('/users/:userId', users.findOne);

    // update a user
    app.put('/users/:userId', users.update);

    // delete user
    app.delete('/users/:userId', users.delete);
}
