import Vue from 'vue'
import Vuex from 'vuex'
import {TokenService} from '../services/storage.service'
import {UserService} from '../services/user.service'
import router from '../router/index'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        accessToken  : TokenService.getToken(),
        state_true : 'Joes',
        authenticationError : '',
        authenticationErrorCode : false,
        authenticating : false,
        userObj : {},
        userLoader : false,
        userUpdatePrompt : false
    },
    getters : { //computed
        loggedIn: (state) => {
            return state.accessToken ? true : false
        },
        authenticating: (state) => {
            return state.authenticating
        },
        authenticationError: (state) => {
            return state.authenticationError
        },
        userObj: (state) => {
            return state.userObj
        },
        userLoader: (state) => {
            return state.userLoader
        },
    
    },
    actions : { //methods
        loginUser : async (context,params) => {
            //commit user state
            context.commit('loginRequest');
            try {               
                const token = await UserService.login(params.email,params.password);
                context.commit('loginSuccess',token);
                context.state.loginLoader = false;
                router.push('/account/dashboard')
            } catch (e) {
                console.log(e.response);
                let error = e.response.data;
                let errorBag = {
                    code : error.response_codese_message,
                    message : error.response_message,
                    data : error.data,
                }
                context.commit('loginError', errorBag)
            }
        },
        getUser : async (context) =>{
            try {
                const user = UserService.getUser();
                user.then(res =>{                                
                    context.commit('logUser', res.data)                    
                });                          
            } catch (error) {
                
            }
        },
        updateUser : async (context,payload) =>{ 
            context.state.userUpdatePrompt = false;     
            context.commit('logUserUpdate',true)          
            try {
                // context.commit('logUserUpdate') 
                const updateUser = UserService.updateUser(payload);
                updateUser.then(res => {
                    console.log(res);  
                    context.state.userUpdatePrompt = true;                   
                    context.commit('logUser', res.data);
                    context.commit('logUserUpdate',false)
                })            
            } catch (error) {
                // context.commit('logUserUpdate') 
            }
        }
    },
    mutations :{ //methods
        loginRequest(state) {
            state.authenticating = true;
            state.authenticationError = ''
            state.authenticationErrorCode = 0
        },
        loginSuccess : (state,token) =>{
            state.authenticating = false;
            state.accessToken = token
        },
        loginError(state, errorBag) {
            state.authenticating = false
            state.authenticationErrorCode = true
            state.authenticationError = errorBag
        },
        logUser(state,payload){
            state.userObj = payload;
        },
        logUserUpdate (state,value){
            state.userLoader = value;
        }
    },

});