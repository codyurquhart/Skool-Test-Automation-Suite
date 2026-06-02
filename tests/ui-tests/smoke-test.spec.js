const { test, expect } = require("../../fixtures/pages.fixture");
const HeaderPartial = require("../../POM/partials/HeaderPartial");
const FooterPartial = require("../../POM/partials/FooterPartial");
const HomePage = require("../../POM/pages/HomePage");


test.describe("smoke tests - logged in", () => {
  test.use({ storageState: "playwright/.auth/user.json" });

  test("homepage loads", async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.expectHomeLoaded();
  });
  test("main navigation is visible", async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.expectHomeLoaded();
    await expect(homePage.header.notificationBtn).toBeVisible();
  });
  test("listings are reachable", async ({ page, homePage }) => {
    await homePage.openHome();
    await expect(homePage.getSearchResultByNumber("", 1)).toBeVisible();
  });
  test("footer is visible", async ({ page, homePage }) => {
    await homePage.openHome();
    await expect(homePage.footer.communityLink).toBeVisible();
  });
});

test.describe("smoke tests - logged out", () => {
  test("login page is reachable", async ({ page, homePage, loginPage }) => {
    await page.goto('/login');
    await expect(page).toHaveURL('/login');
    await expect(loginPage.loginBtn).toBeVisible();
  });
});
