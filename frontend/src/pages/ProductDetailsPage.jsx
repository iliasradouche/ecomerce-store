import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then((response) => setProduct(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    const addToCart = () => {
        axios.post('http://localhost:5000/api/cart', {
            userId: 'user123',
            productId: id,
            quantity: 1,
        }).then(() => {
            navigate('/cart');
        }).catch((error) => console.error(error));
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default ProductDetailsPage;
