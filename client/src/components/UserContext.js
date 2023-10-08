// UserContext.js
import React from 'react';

const UserContext = React.createContext({
    user: null,
    setUser: () => { },
    logout: () => { },
    cart: {},
    setCart: () => { },
    orders: [],
    setOrders: () => { },
    product: [],
    setProduct: () => { },
});



export default UserContext;



