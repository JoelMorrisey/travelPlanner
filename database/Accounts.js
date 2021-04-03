export default class Accounts {
    static instance = Accounts.instance || new Accounts();

    constructor() {
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

    login({email, password}) {
        let user = this.users.find(user => email === user.email && password === user.password)
        return user;
    }

    signup({email, password}) {
        let doesUserExist = this.users.find(user => email === user.email)
        if (doesUserExist) {
            return;
        }
        this.users.push({
            _id: this.users.length,
            email: email,
            password: password
        });
        console.log(this.users)
        return this.users.length;
    }
}