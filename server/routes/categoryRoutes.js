const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/auth').authorize;

// Public routes
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);

// Admin protected routes
router.post(
  '/',
  [
    auth.protect,
    authorize('admin'),
    [check('name', 'Please add a category name').not().isEmpty().trim()]
  ],
  categoryController.createCategory
);

router.put(
  '/:id',
  [
    auth.protect,
    authorize('admin'),
    [check('name', 'Please add a category name').optional().not().isEmpty().trim()]
  ],
  categoryController.updateCategory
);

router.delete('/:id', auth.protect, authorize('admin'), categoryController.deleteCategory);

module.exports = router;