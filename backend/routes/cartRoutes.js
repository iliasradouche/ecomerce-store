const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// POST - Place a new order
router.post('/', async (req, res) => {
    const { userId, products, totalAmount } = req.body;
    try {
        const order = new Order({ userId, products, totalAmount });
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET - Fetch user's orders
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId }).populate('products.productId');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT - Update order status
router.put('/:orderId', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
