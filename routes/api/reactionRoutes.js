const router = require('express').Router();
const {
  deleteReaction
} = require('../../controllers/reactionController.js');

// /api/reactions/:reactionId

router
  .route('/:reactionId')
  .delete(deleteReaction);

module.exports = router;