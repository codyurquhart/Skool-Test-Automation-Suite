class ProfilePage {
    constructor(page) {
        this.page = page;

        this.profilePic = page.locator('div[class*="styled__BottomRight"] img[src]');
    }
}
module.exports = ProfilePage;