import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from './api';
import styled from 'styled-components';
import UserContext from './UserContext';
import { useState } from 'react';


const Container = styled.div`
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
    padding: 20px;
`;

const Title = styled.h2`
    font-size: 24px;
    color: #1877f2;
    margin-bottom: 20px;
`;

const OrderList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const OrderItem = styled.li`
    background-color: #fff;
    border: 1px solid #ccd0d5;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e9ebee;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #1c1e21;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
    }
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

function UserOrders() {
    const [loading, setLoading] = useState(true);
    const { user, orders, setOrders } = useContext(UserContext);


    useEffect(() => {
        async function fetchOrders() {
            try {
                setLoading(true); 
                const response = await api.getOrders();
                const userOrders = user ? response.data.filter(order => order.user_id === user.id) : [];
                setOrders(userOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false); 
            }
        }
    
        fetchOrders();
    }, [user, setOrders]);
    

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    return `${dateObj.toLocaleDateString()} at ${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <Container>
        <Title>Order History</Title>
        {loading ? (
            <p>Loading orders...</p> 
        ) : (
            <OrderList>
                {orders.map(order => (
                    <OrderItem key={order.id}>
                        <StyledLink to={`/orders/${order.id}`}>
                            <UserInfo><UserLabel>Order ID:</UserLabel> {order.id}</UserInfo>
                            <UserInfo><UserLabel>Username:</UserLabel> {user.username}</UserInfo>
                            <UserInfo><UserLabel>Date:</UserLabel> {formatDate(order.created_at)}</UserInfo>
                        </StyledLink>
                    </OrderItem>
                ))}
            </OrderList>
        )}
    </Container>
);
}

export default UserOrders;
