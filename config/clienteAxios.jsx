import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api`
});

export default clienteAxios;