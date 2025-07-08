const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name cannot exceed 50 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    postCount: {
      type: Number,
      default: 0
    }
  },
  { 
    timestamps: true,
    versionKey: false 
  }
);

// Auto-generate slug before saving
categorySchema.pre('save', function(next) {
  this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  next();
});

// Update post count when posts are added/removed
categorySchema.statics.updatePostCount = async function(categoryId) {
  const postCount = await mongoose.model('Post').countDocuments({ category: categoryId });
  await this.findByIdAndUpdate(categoryId, { postCount });
};

// Cascade update when category is deleted
categorySchema.pre('remove', async function(next) {
  await mongoose.model('Post').updateMany(
    { category: this._id },
    { $unset: { category: '' } }
  );
  next();
});

module.exports = mongoose.model('Category', categorySchema);