const mongoose = require('mongoose');
const ErrorResponse = require('../utils/ErrorResponse');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
      maxlength: [5000, 'Content cannot exceed 5000 characters']
    },
    image: {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please select a category']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    commentCount: {
      type: Number,
      default: 0
    }
  },
  { 
    timestamps: true,
    versionKey: false 
  }
);

// Cascade delete comments when a post is deleted
postSchema.pre('remove', async function(next) {
  await this.model('Comment').deleteMany({ post: this._id });
  next();
});

// Ensure author exists
postSchema.pre('save', async function(next) {
  try {
    const userExists = await mongoose.model('User').exists({ _id: this.author });
    if (!userExists) {
      throw new ErrorResponse('Author does not exist', 400);
    }
    next();
  } catch (err) {
    next(err);
  }
});

// Ensure category exists
postSchema.pre('save', async function(next) {
  try {
    const categoryExists = await mongoose.model('Category').exists({ _id: this.category });
    if (!categoryExists) {
      throw new ErrorResponse('Category does not exist', 400);
    }
    next();
  } catch (err) {
    next(err);
  }
});

// Add text index for search functionality
postSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Post', postSchema);