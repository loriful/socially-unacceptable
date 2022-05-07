const { User } = require('../models');
const { Thought } = require('../models');

const UserController = {
  // get all users
      getAllUsers(req, res) {
          User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => {
                res.sendStatus(400);
            });
      },

      // get one user by id
      getUserById({ params }, res) {
        User.findOne({ _id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id!' });
                  return;
                };
                res.json(dbUserData);
              })
            .catch(err => res.json(err));
      },
      
      // create a new user
      createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },

      // update user by id
      updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
          .select('-__v')
          .then(dbUsersData => {
            if (!dbUsersData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUsersData);
          })
          .catch(err => res.status(400).json(err));
      },
       
        // delete user

        //////////////// BONUS - DELETE THOUGHTS WITH USERS COMPLETED ////////////////////
      deleteUser({ params }, res) {
        User.findOne({ _id: params.id}) 
        .then (dbUserData => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user found with this id!' });
            };

            if (!dbUserData.thoughts) {       // no thoughts for this user
              return
            };
            
            for (i=0; i < dbUserData.thoughts.length; i++) {
                Thought.findOneAndDelete({ _id: dbUserData.thoughts[i] })
                .then(dbThoughtData => {
                    if (!dbThoughtData) {
                        return res.status(404).json({ message: 'No thought found with this id!' });
                    };
                  })
                .catch(err => res.json(err));
            }; // for

          User.findOneAndDelete({ _id: params.id })
            .then (dbUserData=> {
                return res.json({ message: 'User and associated thoughts, if any, deleted.'});
            })
            .catch(err => res.json(err))
        })
        .catch(err => res.json(err));    
      },

      ////////////////////////// BONUS COMPLETED ///////////////////////

      // get user, add friend
      // .route('/:userId/friends/:friendId')
      addFriend({ params }, res) {
          User.findOneAndUpdate(
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
          User.findOneAndUpdate(
            { _id: params.userId},
            { $pull: { friends: params.friendId}},
            { new: true }
          )
          .select('-__v')
          .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            };
            res.json(dbUserData);
      })
      .catch(err => res.json(err));
    }
};

module.exports = UserController;
