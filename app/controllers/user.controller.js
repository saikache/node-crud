const User = require('../models/user.model.js');


// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  User.find()
  .then(users => {
    res.send(users);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users."
    });
  });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "user not found with id " + req.params.userId
      });
    }
    res.send(user);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "user not found with id " + req.params.userId
      });
    }
    return res.status(500).send({
      message: "Error retrieving user with id " + req.params.noteId
    });
  });
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if(!req.body.content) {
    return res.status(400).send({
      message: "User content can not be empty"
    });
  }

  if(!req.body.name) {
    return res.status(400).send({
      message: "User name can not be empty"
    });
  }

  // Create a User
  const user = new User({
    name: req.body.name, 
    content: req.body.content
  });

  // Save User in the mongo database
  user.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User."
    });
  });
};

// Update a user identified by the userId
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content || !req.body.name) {
      return res.status(400).send({
        message: "User content / name can not be empty"
      });
    }

    // Find user and update
    User.findByIdAndUpdate(req.params.userId, {
      name: req.body.name,
      content: req.body.content
    }, {new: true})
    .then(user => {
      if(!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      res.send(user);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId
      });
    });
  };

// Delete user
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId
      });
    }
    res.send({message: "User deleted successfully!"});
  }).catch(err => {
    console.log(err)
    return res.status(404).send({
      message: "user not found with id " + req.params.userId
    });
    return res.status(500).send({
      message: "Could not delete user with id " + req.params.userId
    });
  });
};
