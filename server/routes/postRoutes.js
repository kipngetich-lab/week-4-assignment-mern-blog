const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);

// Protected routes
router.post(
  '/',
  [
    auth.protect,
    upload.single('image'),
    [
      check('title', 'Please add a title').not().isEmpty().trim(),
      check('content', 'Please add content').not().isEmpty().trim(),
      check('category', 'Please select a valid category').isMongoId()
    ]
  ],
  postController.createPost
);

router.put(
  '/:id',
  [
    auth.protect,
    upload.single('image'),
    [
      check('title', 'Please add a title').optional().not().isEmpty().trim(),
      check('content', 'Please add content').optional().not().isEmpty().trim(),
      check('category', 'Please select a valid category').optional().isMongoId()
    ]
  ],
  postController.updatePost
);

router.delete('/:id', auth.protect, postController.deletePost);

module.exports = router;