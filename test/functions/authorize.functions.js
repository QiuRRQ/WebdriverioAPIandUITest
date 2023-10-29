import LoginPage from "../test/pageobjects/login.page.js"

class AuthorizeFunctions {
    setAuthorize(username, password, usertoken) {
        LoginPage.login(username, password);
        LoginPage.token(usertoken);
    }
}

export default new AuthorizeFunctions();