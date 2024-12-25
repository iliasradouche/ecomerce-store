import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/cart/user123')
            .then((response) => setCart(response.data))
            .catch((error) => console.error(error));
    }, []);

    const placeOrder = () => {
        const totalAmount = cart.products.reduce(
            (total, item) => total + item.productId.price * item.quantity,
            0
        );

        axios.post('http://localhost:5000/api/orders', {
            userId: 'user123',
            products: cart.products.map((item) => ({
                productId: item.productId._id,
                quantity: item.quantity,
            })),
            totalAmount,
        }).then(() => {
            navigate('/orders');
        }).catch((error) => console.error(error));
    };

    if (!cart) return <p>Loading...</p>;

    return (
        <div>
            <h2>Checkout</h2>
            <ul>
                {cart.products.map((item) => (
                    <li key={item.productId._id}>
                        {item.productId.name} x {item.quantity} = ${item.productId.price * item.quantity}
                    </li>
                ))}
            </ul>
            <h3>
                Total: $
                {cart.products.reduce(
                    (total, item) => total + item.productId.price * item.quantity,
                    0
                )}
            </h3>
            <button onClick={placeOrder}>Place Order</button>
        </div>
    );
}

export default CheckoutPage;
