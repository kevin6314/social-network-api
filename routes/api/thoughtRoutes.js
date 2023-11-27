const router = require('express').Router();

const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// example data
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought); //don't forget to push the created thought's `_id` to the associated user's `thoughts` array field

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reaction
router
  .route('/:thoughtId/reaction')
  .post(createReaction)

// /api/thoughts/:thoughtId/reaction/:reactionId
router
.route('/:thoughtId/reaction/:reactionId')
  .delete(deleteReaction)

module.exports = router;