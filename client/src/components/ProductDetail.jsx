import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from './api';

// Styled components for the user details
const UserDetailsContainer = styled.div`
    width: 300px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 5px;
    background-color: #f5f6f7;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const UserTitle = styled.h2`
    font-size: 24px;
    color: #1877f2;
    margin-bottom: 15px;
    font-weight: 500;
`;

const UserInfo = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
    color: #1c1e21;
`;

const UserLabel = styled.strong`
    color: #4b4f56;
    margin-right: 5px;
`;

function ProductDetail() {
    const [product, setProduct] = useState({});
    const [error, setError] = useState("");
    const { product_id } = useParams();  // Accessing the param using useParams
    const { setCart } = useContext(UserContext);

    useEffect(() => {
        // Fetch product details using the api module
        api.getProductById(product_id)
            .then(response => {
                const data = response.data;  // With axios, the data is under the 'data' property of the response object
                if (data.message) {
                    setError(data.message);
                } else {
                    setProduct(data);
                    setError("");
                }
            })
            .catch(err => {
                console.error("Error fetching product details:", err);
                setError("Failed to load product details. Please try again.");
            });
    }, [product_id]);

    if (error) {
        return <div>{error}</div>;
    }

    const addToCart = (productId, quantity) => {
        setCart(prev => {
            const updatedCart = { ...prev, [productId]: quantity };
            console.log("Updated Cart:", updatedCart);
            return updatedCart;
        });
    };

    return (
        <UserDetailsContainer>
            <UserTitle>Description</UserTitle>
            <UserInfo><UserLabel>Name:</UserLabel> {product.name}</UserInfo>
            <UserInfo><UserLabel>Stock:</UserLabel> {product.price}</UserInfo>
            <UserInfo><UserLabel>Price:</UserLabel> {product.stock}</UserInfo>
            {/* Add any other product attributes you want to display here */}
            <input 
                type="number" 
                min="0" 
                max={product.stock} 
                defaultValue="0"
            />
            <button onClick={() => {
                addToCart(product.id, parseInt(document.querySelector(`input[type="number"]`).value));
            }}>
                Add to Cart
            </button>
        </UserDetailsContainer>
    );
}

export default ProductDetail;


