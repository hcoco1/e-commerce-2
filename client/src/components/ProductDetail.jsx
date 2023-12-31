import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';
import { useParams, NavLink } from 'react-router-dom';
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

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 1px solid #1877f2;
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 1em;
`;


function ProductDetail() {
    const [showMessage, setShowMessage] = useState(false);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [error, setError] = useState("");
    const { product_id } = useParams();
    const { setCart } = useContext(UserContext);

    useEffect(() => {
        api.getProductById(product_id)
            .then(response => {
                const data = response.data;
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
        setShowMessage(true);
    };


    return (
        <UserDetailsContainer>
            <UserTitle>Description</UserTitle>
            <UserInfo><UserLabel>Name:</UserLabel> {product.name}</UserInfo>
            <UserInfo><UserLabel>Stock:</UserLabel> {product.price}</UserInfo>
            <UserInfo><UserLabel>Price:</UserLabel> {product.stock}</UserInfo>
            <input
                type="number"
                min="0"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <Button onClick={() => addToCart(product.id, quantity)}>
                Add to Cart
            </Button>
            {showMessage && (
                <div>
                    Product added!
                    Go to <NavLink to="/cart">Cart</NavLink>
                </div>
            )}
        </UserDetailsContainer>
    );
}

export default ProductDetail;