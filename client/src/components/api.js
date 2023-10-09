// api.js
import axios from './axiosConfig';

const api = {

    // User related routes
    register: (userData) => axios.post('/register', userData),
    login: (userData) => axios.post('/login', userData, { withCredentials: true }), 
    checkSession: () => axios.get('/check_session', { withCredentials: true }),
    logout: () => axios.get('/logout', { withCredentials: true }),
    getUser: () => axios.get('/user', { withCredentials: true }),

    // Product related routes
    getProducts: () => axios.get('/products'),
    getProductById: (productId) => axios.get(`/products/${productId}`),

    // Order related routes
    createOrder: (orderData) => axios.post('/orders', orderData),
    getOrders: () => axios.get('/orders'),
    getOrderById: (orderId) => axios.get(`/orders/${orderId}`),
    updateOrder: (orderId, orderData) => axios.put(`/orders/${orderId}`, orderData)
};

export default api;
