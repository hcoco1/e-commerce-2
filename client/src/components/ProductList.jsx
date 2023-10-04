import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the backend
        fetch("/products")
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);  // The empty dependency array means this useEffect will run once when the component mounts

    return (
        <div className="product-listing">
            {products.map((product) => (
                <div key={product.id} className="product-item">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                                  
                </div>
            ))}
        </div>
    );
}

export default ProductList;
