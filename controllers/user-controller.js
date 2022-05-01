const { Users } = require('../models');

const UsersController = {
  // get all users
  getAllUsers(req, res) {
    Users.find({})
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    Users.findOne({ _id: params.id })
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    Users.create(body)
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch(err => res.json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = UsersController;
