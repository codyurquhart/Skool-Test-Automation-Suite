const { test, expect } = require('../../fixtures/pages.fixture');


test.describe('search functionality tests', () => {
    test.use({ storageState: "playwright/.auth/user.json"});
    test('listings match searched terms', async ({ page, homePage, listingPage }) => {
        await homePage.openHome();
        await homePage.searchBar.fill('AI');
        await homePage.searchBar.press('Enter');
        await expect(listingPage.getListings(1)).toBeVisible();
        await expect(listingPage.getListings(1)).toContainText(/AI/i);
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