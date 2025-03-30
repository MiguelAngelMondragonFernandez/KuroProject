import axios from "axios";


const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    }
});

instance.interceptors.request.use(
    async (config) => {
        return config;
    }
);

export default {
    async doGet(url) {
        return instance.get(import.meta.env.VITE_URL_SERVER + url);
    },

    async doPost(url, data) {
        return instance.post(import.meta.env.VITE_URL_SERVER + url, data);
    },

    async doPut(url, data) {
        return instance.put(import.meta.env.VITE_URL_SERVER + url, data);
    },

    async doDelete(url) {
        return instance.delete(import.meta.env.VITE_URL_SERVER + url);
    },
    
}