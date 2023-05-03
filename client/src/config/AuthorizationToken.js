function AuthorizationToken (token){
    return {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
}

export default AuthorizationToken;