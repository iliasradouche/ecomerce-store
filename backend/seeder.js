const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');
const Cart = require('./models/cartModel');
const Order = require('./models/orderModel');

dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Sample data
const products = [
    {
        name: 'Laptop',
        description: 'High-performance laptop for gaming and work.',
        price: 1500,
        image: 'https://via.placeholder.com/150',
        stock: 10,
    },
    {
        name: 'Smartphone',
        description: 'Latest model with all the features you need.',
        price: 800,
        image: 'https://via.placeholder.com/150',
        stock: 20,
    },
    {
        name: 'Headphones',
        description: 'Noise-cancelling over-ear headphones.',
        price: 200,
        image: 'https://via.placeholder.com/150',
        stock: 15,
    },
];

const carts = [
    {
        userId: 'user123',
        products: [
            { productId: null, quantity: 2 }, // Replace `null` with actual product IDs
        ],
    },
];

const orders = [
    {
        userId: 'user123',
        products: [
            { productId: null, quantity: 1 }, // Replace `null` with actual product IDs
        ],
        totalAmount: 1500,
        status: 'Pending',
    },
];

// Seeder function
const seedData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany();
        await Cart.deleteMany();
        await Order.deleteMany();

        console.log('Data cleared.');

        // Seed products
        const createdProducts = await Product.insertMany(products);
        console.log('Products seeded.');

        // Update Cart and Order product references
        carts[0].products[0].productId = createdProducts[0]._id;
        orders[0].products[0].productId = createdProducts[0]._id;

        // Seed carts
        await Cart.insertMany(carts);
        console.log('Carts seeded.');

        // Seed orders
        await Order.insertMany(orders);
        console.log('Orders seeded.');

        console.log('Database seeding complete!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
