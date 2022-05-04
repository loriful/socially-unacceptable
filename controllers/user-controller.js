const { Users } = require('../models');

const UsersController = {
  // get all users
      getAllUsers(req, res) {
          Users.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => {
                res.sendStatus(400);
            });
      },

      // get one user by id
    getUserById({ params }, res) {
        Users.findOne({ _id: params.id })
            .select('-__v')
            .then(dbUsersData => {
                if (!dbUserData) {
                  return res.status(404).json({ message: 'No user found with this id!' });
                };
                res.json(dbUsersData);
              })
              .catch(err => res.json(err));
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
          .select('-__v')
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
                res.status(404).json({ message: 'No user found for this id!' });
                return;
              }
              res.json({ message: 'User and thoughts deleted for user ' + dbUsersData.username + '.'});
          })
          .catch(err => res.json(err));
      },
      
      // get user, add friend
      addFriend({ params, body }, res) {
          Users.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId}},
            { new: true }
          )
          .select('-__v')
          .then(dbUsersData => {
            if (!dbUsersData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUsersData);
          })
          .catch(err => res.json(err));
      },
    // get user, get friend, delete friend
      deleteFriend({ params }, res) {
          Users.findOneAndUpdate(
            { _id: params.userId},
            { $pull: { friends: params.friendId}},
            { new: true }
          )
          .select('-__v')
          .then(dbUsersData => {
            if (!dbUsersData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            };
            res.json(true);
      })
      .catch(err => res.json(err));
    }
};

module.exports = UsersController;
