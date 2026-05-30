const { test, expect } = require("@playwright/test");
const HeaderPartial = require("../../POM/partials/HeaderPartial");
const FooterPartial = require("../../POM/partials/FooterPartial");
const HomePage = require("../../POM/pages/HomePage");

let home;

test.describe("smoke tests - logged in", () => {
  test.use({ storageState: "playwright/.auth/user.json" });
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
  });
  test("homepage loads", async ({ page }) => {
    await home.goto();
    await home.expectHomeLoaded();
  });
  test("main navigation is visible", async ({ page }) => {
    await home.goto();
    await home.expectHomeLoaded();
    await expect(home.header.notificationBtn).toBeVisible();
  });
  test("listings are reachable", async ({ page }) => {
    await home.openHome();
    await expect(home.getListings(1)).toBeVisible();
  });
  test("footer is visible", async ({ page }) => {
    await home.openHome();
    await expect(home.footer.communityLink).toBeVisible();
  });
});

test.describe("smoke tests - logged out", () => {
  test("login page is reachable", async ({ page }) => {
    home = new HomePage(page);
    await home.goto("/login");
    await expect(home.loginBtn).toBeVisible();
  });
});
