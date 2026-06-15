const { test, expect } = require("../../fixtures/pages.fixture");
const percySnapshot = require("@percy/playwright");
const HomePage = require("../../POM/pages/HomePage");

test.describe('Visual regression "logged out"', () => {
  test("Home page logged out @percy", async ({ page, homePage }, testInfo) => {
    await homePage.openHome();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    await percySnapshot(page, `Home Page logged out - ${testInfo.project.name}`);
  });
});
test.describe('Visual Regression Tests "logged in"', () => {
  test.use({ storageState: 'playwright/.auth/user.json'});
  test("Home page logged in @percy", async ({
    page,
    homePage,
  }, testInfo) => {
    await homePage.openHome();
    await percySnapshot(page, `Home Page logged in - ${testInfo.project.name}`);
  });
  test("Signup page logged in @percy", async ({
    page,
    homePage,
  }, testInfo) => {
    await homePage.openHome();
    await page.goto("/signup");
    await percySnapshot(page, `Signup Page - ${testInfo.project.name}`);
  });
  test("Pricing page logged in @percy", async ({
    page,
    homePage,
  }, testInfo) => {
    await homePage.openHome();
    await page.goto("/signup?v=pricing");
    await percySnapshot(page, `Pricing Page - ${testInfo.project.name}`);
  });
});
