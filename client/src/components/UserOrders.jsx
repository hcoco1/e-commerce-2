// UserOrderHistory.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders when component mounts
    fetch('/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
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
