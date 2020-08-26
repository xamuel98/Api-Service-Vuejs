import {TokenService} from '../services/storage.service'
import axios from 'axios'

const ApiService = {
    init(baseURL){
        axios.defaults.baseURL = baseURL;
    },
    setHeader(){
        axios.defaults.headers = {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${TokenService.getToken()}`
        }
        // axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`
    },
    removeHeader(){
        axios.defaults.headers.common = {};
    },
    get(resource){
        return axios.get(resource);
    },
    post(resource,data){
        return axios.post(resource,data);
    },
    postConfig(resource,data,config){
        return axios.post(resource,config);
    },
    put(resource,data){
        return axios.put(resource,data);
    },
    delete(resource){
        return axios.post(resource,data);
    },
    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
    **/
    customRequest(data){
        return axios(data)
    }
    
}
export default ApiService