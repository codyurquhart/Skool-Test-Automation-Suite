const HomePage = require("../pages/HomePage");

class MobileHomePage extends HomePage {
    constructor(page) {
        super(page);

        this.menuDropDown = page.locator('div[class*="styled__MobileLayoutHeaderWrapper"]').locator('button[class*="styled__ButtonWrapper-sc-1crx28g-1"]').first();

    }
}
module.exports = MobileHomePage;