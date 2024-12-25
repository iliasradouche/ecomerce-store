// File: src/components/CartItem.js
import React from 'react';

function CartItem({ item, onRemove }) {
    return (
        <div className="cart-item">
            <h3>{item.productId.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${item.productId.price * item.quantity}</p>
            <button onClick={() => onRemove(item.productId._id)}>Remove</button>
        </div>
    );
}

export default CartItem;
