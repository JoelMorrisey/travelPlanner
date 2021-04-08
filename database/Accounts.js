export default class Accounts {
    static instance = Accounts.instance || new Accounts();

    constructor() {
        //User accounts
        this.users = [
            {
                _id: 1,
                email: "1@1.com",
                password: "password"
            },
            {
                _id: 2,
                email: "2@2.com",
                password: "password"
            }
        ]
    }

    //Get all emails for registered users
    getAllEmails() {
        return this.users.map(user => user.email);
    }

    //Return the user or undefined if user does not exist
    login({email, password}) {
        let user = this.users.find(user => email === user.email && password === user.password)
        return user;
    }

    //Create a new user
    signup({email, password}) {
        let doesUserExist = this.users.find(user => email === user.email)
        if (doesUserExist) {
            return;
        }
        this.users.push({
            _id: this.users.length+1,
            email: email,
            password: password
        });
        return this.users.length;
    }

    //Sets a user's password
    setPassword(userID, newPassword) {
        this.users.find(user => user._id === userID),password = newPassword;
    }

    //Sets a user's email
    setEmail(userID, newEmail) {
        this.users.find(user => user._id === userID).email = newEmail
    }
}