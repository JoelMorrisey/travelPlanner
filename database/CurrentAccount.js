export default class CurrentAccount {
    static instance = CurrentAccount.instance || new CurrentAccount();

    constructor() {
        this.user = undefined;
        this.flag = "live"
    }

    setLoginStatus(user) {
        this.user = user;
    }

    getAllUserInfo() {
        return this.user;
    }

    getUserID() {
        return this.user._id;
    }

    getUserEmail() {
        return this.user.email;
    }
}