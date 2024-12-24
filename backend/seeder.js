const mongoose = require('mongoose');
const Product = require('./models/productModel');
require('dotenv').config();

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const products = [
            {
                name: 'Product 1',
                description: 'Description for Product 1',
                price: 100,
                image: 'https://via.placeholder.com/150',
                stock: 10,
            },
            {
                name: 'Product 2',
                description: 'Description for Product 2',
                price: 200,
                image: 'https://via.placeholder.com/150',
                stock: 5,
            },
        ];

        await Product.insertMany(products);
        console.log('Products seeded!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedProducts();
