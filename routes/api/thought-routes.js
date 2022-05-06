const router = require('express').Router();

const {
  getAllThoughts,
  createThought,
  getThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/thought
router
  .route('/')
  .get(getAllThoughts);
  
  router
  .route('/:id')
  .post(createThought)
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thought/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction);

// /api/thought/:thoughtId/reactions/:reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
