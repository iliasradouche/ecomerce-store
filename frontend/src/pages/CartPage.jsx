import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from '../components/CartItem';

function CartPage() {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/cart/user123')
            .then((response) => setCart(response.data))
            .catch((error) => console.error(error));
    }, []);

    const removeFromCart = (productId) => {
        axios.delete(`http://localhost:5000/api/cart/user123/${productId}`)
            .then(() => {
                setCart((prevCart) => ({
                    ...prevCart,
                    products: prevCart.products.filter((p) => p.productId._id !== productId),
                }));
            }).catch((error) => console.error(error));
    };

    if (!cart) return <p>Loading...</p>;

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.products.map((item) => (
                <CartItem key={item.productId._id} item={item} onRemove={removeFromCart} />
            ))}
        </div>
    );
}

export default CartPage;
