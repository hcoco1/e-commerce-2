import React, { useState, useEffect, useContext } from 'react';
import api from './api';
import UserContext from './UserContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled components for the shopping cart
const ShoppingCartContainer = styled.div`
    width: 300px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 5px;
    background-color: #f5f6f7;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CartTitle = styled.h2`
    font-size: 24px;
    color: #1877f2;
    margin-bottom: 15px;
    font-weight: 500;
`;

const ProductContainer = styled.div`
    margin-bottom: 20px;
`;

const ProductLabel = styled.label`
    font-size: 16px;
    color: #1c1e21;
`;

const ProductPrice = styled.span`
    font-weight: bold;
    margin-right: 5px;
`;

const ProductInput = styled.input`
    font-size: 16px;
    width: 50px;
`;

const TotalPrice = styled.strong`
    display: block;
    margin-top: 20px;
    font-size: 18px;
`;

const CheckoutButton = styled.button`
    background-color: #1877f2;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
`;

function ShoppingCart() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const { user, cart, setCart } = useContext(UserContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        console.log("Cart in ShoppingCart:", cart);
    }, [cart]);

    const fetchProducts = async () => {
        try {
            const response = await api.getProducts();
            setProducts(response.data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        }
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
    
        if (!user) {
            console.error("User is not logged in!");
            navigate('/login');
           
            return;
        }
    
        const orderProducts = Object.entries(cart).map(([productId, quantity]) => ({
            product_id: parseInt(productId),
            quantity: parseInt(quantity)
        }));
    
        const totalPrice = calculateTotal(); // Calculate the total price
    
        try {
            await api.createOrder({
                user_id: user.id,
                total_price: totalPrice, // Include the total_price in the payload
                products: orderProducts
            });
            setCart({});  // Clear the cart after a successful checkout
        } catch (err) {
            console.error("Error creating order:", err);
        }
    };
    

    const handleProductChange = (productId, quantity) => {
        setCart(prev => ({ ...prev, [productId]: quantity }));
    };

    const calculateTotal = () => {
        return Object.entries(cart).reduce((total, [productId, quantity]) => {
            const product = products.find(p => p.id === parseInt(productId));
            return total + (product?.price || 0) * quantity;
        }, 0);
    };

    return (
        <ShoppingCartContainer>
            <CartTitle>Shopping Cart</CartTitle>
            <div>
                
                {products.filter(product => cart[product.id]).map(product => (
                    <ProductContainer key={product.id}>
                        <ProductLabel>
                            {product.name} (<ProductPrice>${product.price}</ProductPrice>):
                        </ProductLabel>
                        <ProductInput
                            type="number"
                            min="0"
                            max={product.stock}
                            value={cart[product.id] || 0}
                            onChange={e => handleProductChange(product.id, e.target.value)}
                        />
                    </ProductContainer>
                ))}
            </div>
            <TotalPrice>Total Price: ${calculateTotal()}</TotalPrice>
            <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>
        </ShoppingCartContainer>
    );
}

export default ShoppingCart;
