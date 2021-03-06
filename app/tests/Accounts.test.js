//Database
import Accounts from 'database/Accounts';
import CurrentAccount from 'database/CurrentAccount'

describe('Account login', () => {
    let accounts;
    let currentAccount;
    let data = {}

    //Setup
    beforeAll(() => {
        //As test are run parrallel need a new instance of database that is not affected by other tests
        accounts = new Accounts();
        currentAccount = new CurrentAccount();
        //Invalid user login    
        data["invalid account login"] = accounts.login({email: "1@1.com", password:"pass"});
        data["invalid account current"] = currentAccount.getAllUserInfo();
        data["invalid user data"] = undefined;

        //Valid user login
        data["valid account login"] = accounts.login({email: "1@1.com", password:"password"});
        currentAccount.setLoginStatus(data["valid account login"]);
        data["valid account current"] = currentAccount.getAllUserInfo();
        data["valid user data"] = {
            _id: 1,
            email: "1@1.com",
            password: "password",
        };
    })

    //Tests
    it('can login with valid details', () => {
        expect(data["valid account login"]).toEqual(data["valid user data"]);
        expect(data["valid account current"]).toEqual(data["valid user data"]);
    });

    it('cannot login with invalid details', () => {
        expect(data["invalid account login"]).toBe(data["invalid user data"]);
        expect(data["invalid account current"]).toBe(data["invalid user data"]);
    });
});

describe('Account registration', () => {
    let accounts;
    let currentAccount;
    let data = {}

    //Setup
    beforeAll(() => {
        //As test are run parrallel need a new instance of database that is not affected by other tests
        accounts = new Accounts();
        currentAccount = new CurrentAccount();

        data["valid - newly registered account result"] = accounts.signup({email:"j@j.com", password:"password123"});
        data["valid - newly registered account"] =  accounts.login({email:"j@j.com", password:"password123"});
        data["vaild - new account data"] = {
            _id: 4,
            email: "j@j.com",
            password: "password123"
        };

        data["invalid - newly registered account result"] = accounts.signup({email:"j@j.com", password:"password"});
        data["invaild - new account registration expected result"] = undefined;
    })

    //Tests
    it('can register with valid details', () => {
        expect(data["valid - newly registered account result"]).toBe(4);
        expect(data["valid - newly registered account"]).toEqual(data["vaild - new account data"]);
    });

    it('cannot register with same email as another user', () => {
        expect(data["invalid - newly registered account result"]).toEqual(data["invaild - new account registration expected result"]);
    });
});

describe('Account set account details', () => {
    let accounts;
    let currentAccount;
    let data = {}

    //Setup
    beforeAll(() => {
        //As test are run parrallel need a new instance of database that is not affected by other tests
        accounts = new Accounts();
        currentAccount = new CurrentAccount();

        data["valid account details"] = accounts.login({email: "1@1.com", password:"password"});

        //Changing the password
        accounts.setPassword(data["valid account details"]._id, "password123");
        data["user with new password - new password used"] = accounts.login({email: "1@1.com", password:"password123"});
        data["user with new password - old password used"] = accounts.login({email: "1@1.com", password:"password"});

        //Changing the email
        accounts.setEmail(data["valid account details"]._id, "1@2.com");
        data["user with new email - new email used"] = accounts.login({email: "1@2.com", password:"password123"});
        accounts.setEmail(data["valid account details"]._id, "2@2.com");
        data["user after attempting to user another users email"] = accounts.login({email: "2@2.com", password:"password123"});
        data["user with new email - old email used"] = accounts.login({email: "1@1.com", password:"password123"});

        //Get account
        data["account details"] = accounts.login({email: "1@2.com", password:"password123"});

        //Expected result
        data["changed details expected"] = {
            "_id": 1,
            "email": "1@2.com",
            "password": "password123",
        }
    })

    //Tests
    it('can change all details', () => {
        expect(data["account details"]).toEqual(data["changed details expected"]);
    })

    it('can change password', () => {
        expect(data["user with new password - new password used"].password).toEqual(data["changed details expected"].password);
        expect(data["user with new password - old password used"]).toBeUndefined();
    });

    it('can change change email', () => {
        expect(data["user with new email - new email used"].email).toEqual(data["changed details expected"].email);
        expect(data["user with new email - old email used"]).toBeUndefined();
    });

    it('cannot change change email to another users email', () => {
        //Check email did not change to the other users email
        expect(data["user after attempting to user another users email"]).toBeUndefined();
    });
});

describe('Account logout', () => {
    let accounts;
    let currentAccount;
    let data = {}

    //Setup
    beforeAll(() => {
        //As test are run parrallel need a new instance of database that is not affected by other tests
        accounts = new Accounts();
        currentAccount = new CurrentAccount();
        //Valid user login
        data["valid account login"] = accounts.login({email: "1@1.com", password:"password"});
        currentAccount.setLoginStatus(data["valid account login"]);
        currentAccount.logout();
        data["user data after logout"] = currentAccount.getAllUserInfo();
    })

    //Tests
    it('can logout', () => {
        expect(data["user data after logout"]).toBeUndefined();
    });
});