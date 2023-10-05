// UserContext.js
import React from 'react';

const UserContext = React.createContext({
    user: null,
    cart: {},
    setCart: () => {},
});



export default UserContext;
