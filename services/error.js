class AuthencationError extends Error{
    constructor(errorCode,message){
        super(message)
        this.name = this.constructor.name;
        this.message = message;
        this.errorCode = errorCode;        
    }
}

export default AuthencationError;