const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/helpers');
const Post = require('../models/Post');
const Category = require('../models/Category');
//const ErrorResponse = require('../utils/ErrorResponse');
//const asyncHandler = require('../utils/asyncHandler');
const { cloudinary } = require('../config/cloudinary');

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
exports.createPost = asyncHandler(async (req, res, next) => {
  // Add author to request body
  req.body.author = req.user.id;

  // Handle image upload
  if (!req.file) {
    return next(new ErrorResponse('Please upload an image', 400));
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'mern-blog/posts',
    width: 1200,
    crop: 'scale'
  });

  req.body.image = {
    public_id: result.public_id,
    url: result.secure_url
  };

  // Create post
  const post = await Post.create(req.body);

  // Update category post count
  await Category.updatePostCount(post.category);

  res.status(201).json({
    success: true,
    data: post
  });
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  // Filtering
  let query;
  const reqQuery = { ...req.query };
  
  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
  removeFields.forEach(param => delete reqQuery[param]);

  // Search
  if (req.query.search) {
    reqQuery.$text = { $search: req.query.search };
  }

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  
  query = Post.find(JSON.parse(queryStr))
    .populate('category', 'name slug')
    .populate('author', 'name avatar')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'name avatar'
      }
    });

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const total = await Post.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Execute query
  const posts = await query;

  res.status(200).json({
    success: true,
    count: posts.length,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    },
    data: posts
  });
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate('category', 'name slug')
    .populate('author', 'name avatar')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'name avatar'
      }
    });

  if (!post) {
    return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
  }

  // Verify ownership
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to update this post', 401));
  }

  // Handle image upload if new image provided
  if (req.file) {
    // Delete old image
    await cloudinary.uploader.destroy(post.image.public_id);

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'mern-blog/posts',
      width: 1200,
      crop: 'scale'
    });

    req.body.image = {
      public_id: result.public_id,
      url: result.secure_url
    };
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  // Update category post count if category changed
  if (req.body.category && req.body.category !== post.category.toString()) {
    await Category.updatePostCount(post.category);
    await Category.updatePostCount(req.body.category);
  }

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
  }

  // Verify ownership
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to delete this post', 401));
  }

  // Delete image from cloudinary
  await cloudinary.uploader.destroy(post.image.public_id);

  // Get category before deleting to update count
  const categoryId = post.category;

  await post.remove();

  // Update category post count
  await Category.updatePostCount(categoryId);

  res.status(200).json({
    success: true,
    data: {}
  });
});