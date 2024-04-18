import axios from 'axios';
const FONO_API_DOMAIN = "http://localhost:4002";
const API_VERSION = 'v1'

export const fonoAPI = axios.create({
    baseURL: FONO_API_DOMAIN + `/api/${API_VERSION}/`
})
