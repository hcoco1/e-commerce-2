// OrderDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './api'; 

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchOrderDetails() {
            try {
                const response = await api.getOrderById(orderId); 
                const data = response.data;

                if (data.message) {
                    setError(data.message);
                } else {
                    setOrder(data);
                }
            } catch (err) {
                setError("Error fetching the order details");
            }
        }

        fetchOrderDetails();
    }, [orderId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Order Details</h1>
            <p>Order ID: {order.id}</p>
            <p>Total Price: {order.total_price}</p>
            <p>Status: {order.status}</p>
            {/* Add more order details as needed */}
        </div>
    );
};

export default OrderDetail;

