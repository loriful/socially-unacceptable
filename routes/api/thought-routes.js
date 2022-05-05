const router = require('express').Router();

const {
  getAllThoughts,
  createThought,
  getThoughtById,
  updateThoughtbyId,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/userId:/thought
router
  .route('/')
  .get(getAllThoughts);

// /api/userId:/thought
router
  .route('/:userId')
  .post(createThought);

// /api/thought/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThoughtbyId)
  .delete(deleteThought);

// /api/thought/:thoughtId/reaction
router
  .route('/:thoughtId/reaction')
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
