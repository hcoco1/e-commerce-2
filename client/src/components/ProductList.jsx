
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from './api';

// Styles
const ProductListContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr; // By default it has one column for small screens
    gap: 20px;
    margin: 0 auto;  // Center the container (if desired)

    @media (min-width: 576px) {  // Medium screen breakpoint (you can adjust as needed)
        grid-template-columns: repeat(2, 1fr);  // Two columns for medium screens
    }

    @media (min-width: 992px) {  // Large screen breakpoint (you can adjust as needed)
        grid-template-columns: repeat(3, 1fr);  // Three columns for large screens
    }
`;

const ProductCard = styled.div`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;

    a {
        color: #1877f2; // Facebook blue color
        font-weight: 500;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const UserInfo = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
    color: #1877f2;
`;

const UserLabel = styled.strong`
    color: #4b4f56;
    margin-right: 5px;
`;


// ProductList component
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
        <ProductListContainer>
            {products.map((product) => (
                <ProductCard key={product.id}>
                    <Link to={`/products/${product.id}`}>
                        <UserInfo><UserLabel>Product:</UserLabel> {product.name}</UserInfo>
                        <UserInfo><UserLabel>Price:</UserLabel> {product.price} $</UserInfo>
                    </Link>
                </ProductCard>
            ))}
        </ProductListContainer>
    );
}

export default ProductList;


