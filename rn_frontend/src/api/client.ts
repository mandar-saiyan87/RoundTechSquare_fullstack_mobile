import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${process.env.BACKEND_API_URL}/api` || 'http://localhost:5000/api',

});

