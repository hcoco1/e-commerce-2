import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import api from './api';


function ProductList() {
    const [products, setProducts] = useState([]);
  

    useEffect(() => {
        // Fetch products from the backend using the api module
        api.getProducts()
            .then((response) => {
                const data = response.data;
                setProducts(data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);



    return (
        <div className="product-listing">
            {products.map((product) => (
                <div key={product.id} className="product-item">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                    {/* Removed input and button here */}
                </div>
            ))}
        </div>
    );
}

export default ProductList;


