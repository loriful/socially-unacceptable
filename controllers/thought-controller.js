const { Thought, User} = require('../models');
 
const ThoughtController = {
      // get all thoughts
      getAllThoughts(req, res) {
          Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.sendStatus(400);
            });
      },

      // get one thought by id
      getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id})
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                  res.status(404).json({ message: 'No thought found with this id!' });
                  return;
                };
                res.json(dbThoughtData);
              })
            .catch(err => res.json(err));
      },
      
      // create a new thought
      createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbThoughtData)
          })
          .catch(err => res.json(err));
      },

      // update thought by id
      updateThoughtbyId({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
          .select('-__v')
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
      },

      // delete thought
      deleteThought({ params }, res) {
         console.log('in deep thoughts, this is params ' + params);
          Thought.findOneAndDelete({ _id: params.id })
          .then(dbThoughtData => {
              if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
              }
              res.json({ message: 'Thought deleted.'});
          })
          .catch(err => res.json(err));
      },
      // /api/thought/:thoughtId/reaction
      // get thought, add reaction
      createReaction({ params, body }, res) {
          Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: params.body}},
            { new: true }
          )
          .select('-__v')
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },
     
    // get thought, get reaction, delete reaction
      deleteReaction({ params }, res) {
          Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: { reactions: params.reactionId}},
            { new: true }
          )
          .select('-__v')
          .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            };
            res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
      }
}; // ThoughtController

module.exports = ThoughtController;
