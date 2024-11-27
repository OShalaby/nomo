const BasePage = require('./base.page');
const PageFactory = require('../utils/pageFactory');

class LoginPage extends BasePage {
    constructor() {
        super();

        this.sharedLocators = {
            productsScreen: 'products screen',
            loginScreen: 'login screen',
            usernameInput: 'Username input field',
            passwordInput: 'Password input field',
            loginButton: 'Login button',
            loginMenuItem: 'menu item log in',
            logoutMenuItem: 'menu item log out',
        };

        this.androidLocators = {
            menu: 'open menu',
            confirmLogout: 'android:id/button1', // resource-id
            okButton: 'android:id/button1', // resource-id
            lockedMessage: 'generic-error-message',
            noMatchMessage: 'generic-error-message',
            noUserMessage: 'Username-error-message',
            noPasswordMessage: 'Password-error-message',
        };

        this.iOSLocators = {
            menu: 'tab bar option menu',
            confirmLogout: '//XCUIElementTypeButton[@name="Log Out"]', // XPath
            okButton: 'OK',
            lockedMessage: 'Sorry, this user has been locked out.',
            noMatchMessage: 'Provided credentials do not match any user in this service.',
            noUserMessage: 'Username is required',
            noPasswordMessage: 'Password is required',
        };

        this.locators = {
            ...this.sharedLocators,
            ...(driver.isAndroid ? this.androidLocators : this.iOSLocators),
        };
    }

    get productsScreen() {
        return PageFactory.getElement(this.locators.productsScreen);
    }

    get usernameField() {
        return PageFactory.getElement(this.locators.usernameInput);
    }

    get passwordField() {
        return PageFactory.getElement(this.locators.passwordInput);
    }

    get loginButton() {
        return PageFactory.getElement(this.locators.loginButton);
    }

    get menu() {
        return PageFactory.getElement(this.locators.menu);
    }

    get loginMenuItem() {
        return PageFactory.getElement(this.locators.loginMenuItem);
    }

    get logoutMenuItem() {
        return PageFactory.getElement(this.locators.logoutMenuItem);
    }

    get confirmLogout() {
        return PageFactory.getElement(this.locators.confirmLogout);
    }

    get okButton() {
        return PageFactory.getElement(this.locators.okButton);
    }

    get lockedMessage() {
        return PageFactory.getElement(this.locators.lockedMessage);
    }

    get noMatchMessage() {
        return PageFactory.getElement(this.locators.noMatchMessage);
    }

    get noUserMessage() {
        return PageFactory.getElement(this.locators.noUserMessage);
    }

    get noPasswordMessage() {
        return PageFactory.getElement(this.locators.noPasswordMessage);
    }

    get loginScreen() {
        return PageFactory.getElement(this.locators.loginScreen);
    }

    async navigate() {
        await this.click(await this.menu);
        await this.click(await this.loginMenuItem);
    }

    async login(username, password) {
        await this.setInputValue(await this.usernameField, username);
        await this.setInputValue(await this.passwordField, password);
        await this.click(await this.loginButton);
    }

    async logout() {
        await this.click(await this.menu);
        await this.click(await this.logoutMenuItem);
        await this.click(await this.confirmLogout);
        await this.click(await this.okButton);
    }

    async isLockedVisible() {
        return await this.waitForElement(await this.lockedMessage);
    }

    async isNoMatchVisible() {
        return await this.waitForElement(await this.noMatchMessage);
    }

    async isNoUserVisible() {
        return await this.waitForElement(await this.noUserMessage);
    }

    async isNoPasswordVisible() {
        return await this.waitForElement(await this.noPasswordMessage);
    }

    async isProductsScreenVisible() {
        return await this.waitForElement(await this.productsScreen);
    }

    async isLoginScreenVisible() {
        return await this.waitForElement(await this.loginScreen);
    }

}

module.exports = new LoginPage();
