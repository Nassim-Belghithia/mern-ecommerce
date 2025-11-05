const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['men', 'women', 'kid'],
    lowercase: true
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL']
  },
  new_price: {
    type: Number,
    required: [true, 'Please provide a new price'],
    min: 0
  },
  old_price: {
    type: Number,
    required: [true, 'Please provide an old price'],
    min: 0
  },
  description: {
    type: String,
    default: ''
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);



