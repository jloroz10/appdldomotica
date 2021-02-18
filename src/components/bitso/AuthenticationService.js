class AuthenticationService{

    registerSuccesfulLogin(username,password){
        sessionStorage.setItem('authenticatedUser',username)
        this.username = username
    }

    logout(username){
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLogged(username){
        var userRetrieved = sessionStorage.getItem('authenticatedUser');
        console.log(userRetrieved)
        if(userRetrieved === null)
         return false;
        
        return true;
    }

    getUserLoggedIn(){
        let username = sessionStorage.getItem('authenticatedUser');
        if(username === null)
            return '';
        
        return username;
    }
}

export default new AuthenticationService();