export default class currentAccount {
    static instance = currentAccount.instance || new currentAccount();

    constructor() {
        this.user = undefined;
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