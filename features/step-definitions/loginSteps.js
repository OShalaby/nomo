import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../page-objects/login.page';
import LOGIN_USERS from '../../utils/testData';

Given('I am on the main screen', async () => {
    await LoginPage.waitForElement(await LoginPage.productsScreen);
});

When('I navigate to the login page', async () => {
    await LoginPage.navigate();
});

When(/^I login as "(LOCKED|NO_MATCH|NO_USER_DETAILS|NO_PASSWORD|STANDARD)"$/, async (userType) => {
    const { username, password } = LOGIN_USERS[userType];
    await LoginPage.login(username, password);
});

Then('I should see products', async () => {
    expect(await LoginPage.isProductsScreenVisible()).toBe(true);
});

Then('I should see locked error', async () => {
    expect(await LoginPage.isLockedVisible()).toBe(true);
});

Then('I should see no match error', async () => {
    expect(await LoginPage.isNoMatchVisible()).toBe(true);
});

Then('I should see no username error', async () => {
    expect(await LoginPage.isNoUserVisible()).toBe(true);
});

Then('I should see no password error', async () => {
    expect(await LoginPage.isNoPasswordVisible()).toBe(true);
});

Then('I logout', async () => {
    await LoginPage.logout();
    expect(await LoginPage.isLoginScreenVisible()).toBe(true);
});
