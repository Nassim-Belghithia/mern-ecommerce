const express = require('express');
const router = express.Router();
// Import route handlers
const authRoutes = require('./auth');
const productRoutes = require('./products');
const cartRoutes = require('./cart');
// Use route handlers
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
// Health check
router.get('/health', (req, res) => {
    res.json({ message: 'API is running', status: 'OK' });
});

module.exports = router;
