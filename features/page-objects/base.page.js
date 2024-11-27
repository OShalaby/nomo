class BasePage {
    async waitForElement(element, timeout = 5000) {
        try {
            await element.waitForDisplayed({ timeout });
            console.log('Element is displayed');
            return true;
        } catch (error) {
            throw new Error(`Element not displayed within ${timeout}ms`);
        }
    }

    async click(element) {
        await this.waitForElement(element);
        await element.click();
    }

    async setInputValue(element, value) {
        await this.waitForElement(element);
        await element.setValue(value);
        if (await driver.isKeyboardShown()) {
            if (driver.isAndroid) {
                await driver.hideKeyboard();
            } else {
                await driver.hideKeyboard('pressKey', 'return');
            }
        }
    }
}
module.exports = BasePage;
