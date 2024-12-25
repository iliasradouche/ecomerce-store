import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/orders/user123')
            .then((response) => {
                console.log(response.data); // Debug the API response
                setOrders(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    if (!Array.isArray(orders)) {
        return <p>No orders found</p>;
    }

    return (
        <div>
            <h2>Your Orders</h2>
            {orders.map((order) => (
                <div key={order._id} className="order-item">
                    <h3>Order #{order._id}</h3>
                    <p>Status: {order.status}</p>
                    <ul>
                        {order.products.map((item) => (
                            <li key={item.productId._id}>
                                {item.productId.name} x {item.quantity} = ${item.productId.price * item.quantity}
                            </li>
                        ))}
                    </ul>
                    <h4>Total: ${order.totalAmount}</h4>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default OrdersPage;
