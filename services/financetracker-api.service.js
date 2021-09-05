import axios from 'axios';

const api = axios.create({
    baseURL: 'https://finance-tracker-api.azurewebsites.net/api/'
});

export default api;