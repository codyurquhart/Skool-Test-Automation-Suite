const { test, expect } = require('../../fixtures/pages.fixture');


test.describe('search functionality tests', () => {
    test.use({ storageState: "playwright/.auth/user.json"});
    test('listings match searched terms', async ({ page, homePage, listingPage }) => {
        const searchTerm = "AI";
        await homePage.openHome();
        await homePage.searchBar.fill(`${searchTerm}`);
        await homePage.searchBar.press('Enter');
        await expect(homePage.getListingByName(searchTerm).first()).toBeVisible();
        await expect(homePage.getSearchResultByNumber(searchTerm, 1)).toBeVisible();
        await expect(homePage.getSearchResultByNumber(searchTerm, 1)).toContainText(/AI/i);
    });
    test('testing "free" and "paid" filter functions', async ({ page, homePage }) => {
        await homePage.openHome();
        await homePage.filterBtn.click();
        await homePage.freeCheckbox.click();
        await expect(page).toHaveURL('/discovery?pr=free&srt=trending');
        await expect(homePage.getListingPayStatus(1)).toContainText(/free/i);
        await homePage.filterBtn.click();
        await homePage.paidCheckbox.click();
        await expect(homePage.getListingPayStatus(1)).toContainText(/$/i);
    });
    

});