import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from './api';

// Styles
const ProductListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;
`;

const ProductCard = styled.div`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
    padding: 20px;
    width: calc(33.33% - 40px);

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