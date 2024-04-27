import axios from 'axios';
import { FONO_API_DOMAIN } from '../config';

const API_VERSION = 'v1'

export const fonoAPI = axios.create({
    baseURL: FONO_API_DOMAIN + `/api/${API_VERSION}/`
})
