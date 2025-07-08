// At the top of each controller file
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/helpers');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
//const ErrorResponse = require('../utils/ErrorResponse');
//const asyncHandler = require('../utils/asyncHandler');

// @desc    Get comments for post
// @route   GET /api/comments/:postId
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('author', 'name')
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments
  });
});

// @desc    Add comment
// @route   POST /api/comments/:postId
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    return next(new ErrorResponse('Post not found', 404));
  }

  const comment = await Comment.create({
    content: req.body.content,
    post: req.params.postId,
    author: req.user.id
  });

  // Update comment count
  post.commentCount += 1;
  await post.save();

  res.status(201).json({
    success: true,
    data: comment
  });
});

// @desc    Delete comment
// @route   DELETE /api/comments/:postId/:commentId
// @access  Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findOne({
    _id: req.params.commentId,
    post: req.params.postId
  });

  if (!comment) {
    return next(new ErrorResponse('Comment not found', 404));
  }

  // Check ownership
  if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to delete this comment', 401));
  }

  await comment.remove();

  // Update comment count
  await Post.findByIdAndUpdate(req.params.postId, {
    $inc: { commentCount: -1 }
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});