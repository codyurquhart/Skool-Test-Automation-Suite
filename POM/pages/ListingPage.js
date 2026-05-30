const HomePage = require('../pages/HomePage');

class ListingPage extends HomePage {
    constructor(page) {
        super(page);

        this.listingName = page.locator('div[class*="styled__GroupTitle"]');

    }
}
module.exports = ListingPage;