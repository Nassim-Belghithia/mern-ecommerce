const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get user cart
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Convert Map to object for JSON response
    const cartItemsObj = {};
    if (user.cartItems) {
      user.cartItems.forEach((value, key) => {
        cartItemsObj[key] = value;
      });
    }

    // Get product details for cart items
    const cartItems = [];
    for (const [productId, quantity] of Object.entries(cartItemsObj)) {
      if (quantity > 0) {
        try {
          const product = await Product.findById(productId);
          if (product) {
            cartItems.push({
              productId: product._id.toString(),
              name: product.name,
              image: product.image,
              new_price: product.new_price,
              old_price: product.old_price,
              quantity: quantity
            });
          }
        } catch (error) {
          // Product might not exist, skip it
          continue;
        }
      }
    }

    res.json({
      success: true,
      cartItems: cartItemsObj,
      cartItemsDetails: cartItems
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Please provide productId' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(req.user._id);
    
    // Initialize cartItems if it doesn't exist
    if (!user.cartItems) {
      user.cartItems = new Map();
    }

    // Add product to cart or increment quantity
    const currentQuantity = user.cartItems.get(productId) || 0;
    user.cartItems.set(productId, currentQuantity + 1);

    await user.save();

    res.json({
      success: true,
      message: 'Product added to cart',
      cartItems: Object.fromEntries(user.cartItems)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove from cart
router.post('/remove', auth, async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Please provide productId' });
    }

    const user = await User.findById(req.user._id);

    if (!user.cartItems) {
      return res.json({
        success: true,
        message: 'Cart is already empty',
        cartItems: {}
      });
    }

    const currentQuantity = user.cartItems.get(productId) || 0;

    if (currentQuantity <= 1) {
      user.cartItems.delete(productId);
    } else {
      user.cartItems.set(productId, currentQuantity - 1);
    }

    await user.save();

    res.json({
      success: true,
      message: 'Product removed from cart',
      cartItems: Object.fromEntries(user.cartItems)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update cart item quantity
router.put('/update', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'Please provide productId and quantity' });
    }

    if (quantity < 0) {
      return res.status(400).json({ message: 'Quantity cannot be negative' });
    }

    const user = await User.findById(req.user._id);

    if (!user.cartItems) {
      user.cartItems = new Map();
    }

    if (quantity === 0) {
      user.cartItems.delete(productId);
    } else {
      user.cartItems.set(productId, quantity);
    }

    await user.save();

    res.json({
      success: true,
      message: 'Cart updated',
      cartItems: Object.fromEntries(user.cartItems)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cartItems = new Map();
    await user.save();

    res.json({
      success: true,
      message: 'Cart cleared',
      cartItems: {}
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;



