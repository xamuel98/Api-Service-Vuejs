import axios from 'axios'
const BASEURL = 'http://127.0.0.1:8002/api/';
axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
export default class Confirm  {
    login(postBody){
        return axios.post(`${BASEURL}login-user`,postBody);
    }
    registerUser(postBody){
        return axios.post(`${BASEURL}create-new-user`,regData);
    }

    getAuthenticated() {
        let authToken = localStorage.getItem('authToken');
        return authToken;        
    }
}