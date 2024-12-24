const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');

// GET - Fetch user's cart
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
        res.json(cart || { userId: req.params.userId, products: [] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST - Add product to cart
router.post('/', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        // Check if product already exists in cart
        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

        if (productIndex > -1) {
            // Update quantity
            cart.products[productIndex].quantity += quantity;
        } else {
            // Add new product
            cart.products.push({ productId, quantity });
        }

        const updatedCart = await cart.save();
        res.status(201).json(updatedCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE - Remove product from cart
router.delete('/:userId/:productId', async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            cart.products = cart.products.filter((p) => p.productId.toString() !== productId);
            await cart.save();
        }
        res.json({ message: 'Product removed from cart' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
