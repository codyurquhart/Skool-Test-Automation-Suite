const HeaderPartial = require('../partials/HeaderPartial');

class MobileHeaderPartial extends HeaderPartial {
    constructor(page) {
        super(page);

        this.mobileMenu = page.locator('.styled__BoxWrapper-sc-esqoz3-0 .styled__ButtonWrapper-sc-1crx28g-1');

    }

}
module.exports = MobileHeaderPartial;