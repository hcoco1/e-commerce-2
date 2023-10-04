import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({}); // Initialize the cart state

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

  return (
    <UserContext.Provider value={{ user, setUser, cart, setCart }}>
        {children}
    </UserContext.Provider>
  );
};

export default UserProvider

