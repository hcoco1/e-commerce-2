import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://phase5-app-tyia.onrender.com' : 'http://localhost:5555';

const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;


