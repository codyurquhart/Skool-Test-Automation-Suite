const { test, expect } = require("../fixtures/pages.fixture");
const HeaderPartial = require("../POM/partials/HeaderPartial");
const FooterPartial = require("../POM/partials/FooterPartial");
const HomePage = require("../POM/pages/HomePage");
/** @type {HomePage} */
let home;

test.describe("locator debugging", () => {
  // test.use({ storageState: "playwright/.auth/user.json" });
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
  });
  test.skip("locator test @mobile", async ({ page, _login, mobileHomePage }) => {
    await expect(mobileHomePage.menuDropDown).toBeVisible();
  });
  test.skip("locator test browser", async ({ page, homePage }) => {
    await homePage.openPopupLogin();
    await expect(homePage.loginPopup).toContainText(/email/i);
  });

});