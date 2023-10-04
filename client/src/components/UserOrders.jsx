// UserOrderHistory.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from './api';

function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
        try {
            const response = await api.getOrders();  // Using the new api
            setOrders(response.data);   // Access the data property from the axios response
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
             <Link to={`/products/${order.id}`}>{order.id} {order.created_at}</Link>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserOrders;
