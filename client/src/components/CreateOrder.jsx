import axios from './axiosConfig';
import React, { useState } from 'react';

function CreateOrder() {
    const [orderData, setOrderData] = useState({
        user_id: '', // Assuming you'll get this from user's session or context
        total_price: 0,
        status: 'Pending',
        products: []  // An array of { product_id, quantity }
    });

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/orders', orderData);
            console.log("Order Created!", response.data);
        } catch (error) {
            console.error("Error creating order", error);
        }
    }

    return (
        // A form or UI component to gather order details and submit using handleSubmit
    );
}
