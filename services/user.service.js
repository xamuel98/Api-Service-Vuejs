import ApiService from './api.service'
import {TokenService} from './storage.service'

class AuthencationError extends Error{
    constructor(errorCode,message){
        super(message)
        this.name = this.constructor.name;
        this.message = message;
        this.errorCode = errorCode;        
    }
}

const UserService = {
     /**
     * Login the user and store the access token to TokenService. 
     * 
     * @returns access_token
     * @throws AuthenticationError 
    **/

    login : async function (email,password) {
        const requestData = {
            method : 'post',
            url : '/login-user',
            data : {
                email : email,
                password : password,
            }
        }
        try {
            const response = await ApiService.customRequest(requestData)          
            TokenService.saveToken(response.data.data.auth_token)
            // TokenService.saveRefreshToken(response.data.refresh_token)
            // Update the header in ApiService
            ApiService.setHeader();
            // console.log(response);  
            return response.data.data.auth_token;       
        } catch (error) {
            throw error;
        }
    },

    /**
     * Logout the current user by removing the token from storage. 
     * 
     * Will also remove `Authorization Bearer <token>` header from future requests.
    **/
    logout(){
        TokenService.removeToken();
        ApiService.removeHeader();
    },
    getUser : async function () {
        try{
            const response = await ApiService.get('/user');         
            return response.data;
        }catch(error){
            throw error;
        }
    },
    updateUser : async function (payload) {
        try{
            const response = await ApiService.post('/update-user',payload);         
            return response.data;
        }catch(error){
            throw error;
        } 
    }

    
}

export {UserService,AuthencationError}