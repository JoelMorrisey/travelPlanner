export default class CurrentAccount {
    static instance = CurrentAccount.instance || new CurrentAccount();

    constructor() {
        //The current user's profile
        this.user = undefined;
    }

    //Sets the current user
    setLoginStatus(user) {
        this.user = user;
    }

    //Get all user info
    getAllUserInfo() {
        return this.user;
    }

    //Get the user's ID
    getUserID() {
        return this.user._id;
    }

    //Gets the user's email
    getUserEmail() {
        return this.user.email;
    }
    
    //Logs the user out
    logout() {
        this.user = undefined;
    }
}