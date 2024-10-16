import axios from 'axios'
import {storage} from "@/utils/storage";

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API as string,
    timeout: 5000
})

// 请求拦截器，还能设置api鉴权
instance.interceptors.request.use(
    (config) => {
        const userStorage = storage('user')
        const token = userStorage.get();
        if (token) {
            const newConfig = {...config};
            newConfig.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default instance
