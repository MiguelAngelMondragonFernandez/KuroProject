import axios from "axios";

const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user)
        return user.access_token;
    return null;
}


const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
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
