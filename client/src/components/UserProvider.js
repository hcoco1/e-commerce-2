//UserProvider.js
import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';
import api from './api';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({}); // Initialize the cart state
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState([]);



  useEffect(() => {
    fetch("/check_session", {
      method: 'GET',
      credentials: 'include', // ensure cookies are sent with request
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Session check failed");
    })
    .then((userData) => {
      setUser(userData);
    })
    .catch((error) => {
      console.error("Error fetching user session:", error);
    });
  }, []);

 // Fetching and Setting the Orders Data:
  useEffect(() => {
      async function fetchUserOrders() {
          try {
              const response = await api.getOrders(); // Assuming you have an API method to get orders
              setOrders(response.data);
          } catch (error) {
              console.error("Error fetching orders:", error);
          }
      }

      fetchUserOrders();
  }, []);




  const logout = () => {
    setUser(null); // Clear the user state
    setCart({});   // Optionally, clear the cart as well if needed
    // You can also add any other cleanup logic here if needed
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, cart, setCart, orders, setOrders, product, setProduct  }}>
        {children}
    </UserContext.Provider>
  );
};

export default UserProvider;


