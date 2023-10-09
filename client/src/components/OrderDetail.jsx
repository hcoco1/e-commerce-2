// OrderDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from './api';

// Styled components for the order details
const OrderDetailsContainer = styled.div`
    width: 300px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 5px;
    background-color: #f5f6f7;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const OrderTitle = styled.h1`
    font-size: 24px;
    color: #1877f2;
    margin-bottom: 15px;
    font-weight: 500;
`;

const OrderInfo = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
    color: #1c1e21;
`;

const OrderLabel = styled.strong`
    color: #4b4f56;
    margin-right: 5px;
`;

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
        <OrderDetailsContainer>
            <OrderTitle>Order Details</OrderTitle>
            <OrderInfo><OrderLabel>Order ID:</OrderLabel> {order.id}</OrderInfo>
            <OrderInfo><OrderLabel>Total Price:</OrderLabel> {order.total_price}</OrderInfo>
            <OrderInfo><OrderLabel>Status:</OrderLabel> {order.status}</OrderInfo>
        </OrderDetailsContainer>
    );
};

export default OrderDetail;

