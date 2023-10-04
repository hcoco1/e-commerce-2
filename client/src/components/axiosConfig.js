import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5555', // or your server's address
    timeout: 10000, // Optional
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;

