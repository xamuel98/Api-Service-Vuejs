const TOKEN_KEY = 'access_token';
const REFRESHER_TOKEN_KEY = 'refresh_token'

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
**/

const TokenService = {
    getToken(){
        return localStorage.getItem(TOKEN_KEY);
    },

    saveToken(accessToken){
        localStorage.setItem(TOKEN_KEY,accessToken);
    },

    removeToken(){
        localStorage.removeItem(TOKEN_KEY);
    },

    getRefreshToken(){
        return localStorage.getItem(REFRESHER_TOKEN_KEY);
    },

    saveRefreshToken(refresh_token){
        localStorage.setItem(REFRESHER_TOKEN_KEY,refresh_token)
    },
    removeRefreshToken(){
        localStorage.removeItem(REFRESHER_TOKEN_KEY);
    },
}
export {TokenService}