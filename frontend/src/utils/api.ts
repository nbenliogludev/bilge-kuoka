import axios from "axios";

const BASE_API = "http://45.147.46.138:8080/api"

export const baseApi = axios.create({
    baseURL: BASE_API,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});