import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername() {
        return $("//input[@name='username']");
    }

    get inputPassword() {
        return $("//input[@name='password']");
    }

    get inputToken() {
        return $("//div[4]//section[1]//input[1]");
    }

    get btnSubmitUser() {
        return $("//div[@class='modal-ux-inner']//div[1]//form[1]//div[2]//button[1]");
    }

    get btnSubmitToken() {
        return $("//div[@class='modal-ux-content']//div[2]//form[1]//div[2]//button[1]");
    }

    get btnAuthorizeMenu() {
        return $("//span[normalize-space()='Authorize']");
    }

    get btnCloseAuthorizeMenu() {
        return $("//div[@class='modal-ux-inner']//div[1]//form[1]//div[2]//button[2]");
    }
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login(username, password) {
        await this.btnAuthorizeMenu.click();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmitUser.click();
    }

    async token(usertoken) {
        await this.inputToken.setValue(usertoken);
        await this.btnSubmitToken.click();
        await this.btnCloseAuthorizeMenu.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open();
    }
}

export default new LoginPage();
