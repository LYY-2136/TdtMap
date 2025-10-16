import axios from 'axios';
import { tTk } from './tmap-utils';

const request = axios.create({
    timeout: 60000,
    baseURL: 'http://api.tianditu.gov.cn',
});

request.interceptors.request.use(
    (config) => {
        // 接口注入天地图token
        config.params.tk = tTk;
        return config;
    }
);

request.interceptors.response.use(
    (response) => {
        return response.data;
    }
);

export default request;