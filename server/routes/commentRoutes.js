const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.get('/:postId', commentController.getComments);

router.post(
  '/:postId',
  [
    auth.protect,
    [check('content', 'Please add some content').not().isEmpty()]
  ],
  commentController.addComment
);

router.delete('/:postId/:commentId', auth.protect, commentController.deleteComment);

module.exports = router;