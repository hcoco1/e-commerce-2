import React, { useState, useEffect, useContext } from 'react';
import api from './api';
import UserContext from './UserContext';

function ShoppingCart() {
    const [products, setProducts] = useState([]);
    const { user, cart, setCart } = useContext(UserContext);

    useEffect(() => {
        console.log("Cart in ShoppingCart:", cart);
    }, [cart]);
    

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await api.getProducts();
                setProducts(response.data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            }
        }

        fetchProducts();
    }, []);

    const handleCheckout = async (e) => {
        e.preventDefault();


     

        const orderProducts = Object.entries(cart).map(([productId, quantity]) => ({
            product_id: parseInt(productId),
            quantity: parseInt(quantity)
        }));

        try {
            await api.createOrder({
                user_id: user.id,
                products: orderProducts
            });

            // Clear the cart after a successful checkout
            setCart({});
        } catch (err) {
            console.error("Error creating order:", err);
        }
    };

    const handleProductChange = (productId, quantity) => {
        setCart(prev => ({ ...prev, [productId]: quantity }));
    };

    const calculateTotal = () => {
        if (!cart) return 0; // Check if cart is null or undefined and return early
    
        return Object.entries(cart).reduce((total, [productId, quantity]) => {
            const product = products.find(p => p.id === parseInt(productId));
            return total + (product?.price || 0) * quantity;
        }, 0);
    };
    

    return (
        <div>
            <h2>Shopping Cart</h2>
            <div>
                <h3>Selected Products:</h3>
           

                {products.filter(product => cart && cart[product.id]).map(product => ( // Display only products in the cart
                    <div key={product.id}>
                        <label>{product.name} (${product.price}):</label>
                        <input 
                            type="number" 
                            min="0" 
                            max={product.stock}
                            value={cart[product.id] || 0}
                            onChange={e => handleProductChange(product.id, e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <div>
                <strong>Total Price: ${calculateTotal()}</strong>
            </div>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
}

export default ShoppingCart;
