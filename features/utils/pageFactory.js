class PageFactory {
    static getElement(locator) {
        if (driver.isAndroid && locator.startsWith('android:id/')) {
            return $(`android=new UiSelector().resourceId("${locator}")`);
        }

        if (!driver.isAndroid && locator.startsWith('//')) {
            return $(locator);
        }

        return $(`~${locator}`);
    }
}

module.exports = PageFactory;
