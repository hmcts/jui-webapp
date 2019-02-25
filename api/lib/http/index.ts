import axios, { AxiosInstance } from 'axios'
import * as  axiosHttpsProxy from 'axios-https-proxy'
import { config } from '../../../config'
import { errorInterceptor, requestInterceptor, successInterceptor } from '../interceptors'

const options = config.proxy ? {
    proxy: {
        host: config.proxy.host,
        port: config.proxy.port,
    },
} : {}

export const http: AxiosInstance = axios.create(options)

axios.defaults.headers.common['Content-Type'] = 'application/json'

if (config.proxy) {
    http.interceptors.request.use(axiosHttpsProxy)
}

http.interceptors.request.use(requestInterceptor)
http.interceptors.response.use(successInterceptor, errorInterceptor)
