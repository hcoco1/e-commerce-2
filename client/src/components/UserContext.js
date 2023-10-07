// UserContext.js
import React from 'react';

const UserContext = React.createContext({
    user: null,
    setUser: () => {},
    logout: () => {},
    cart: {},
    setCart: () => {},
});



export default UserContext;
