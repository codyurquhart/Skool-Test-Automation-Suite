const { test, expect } = require("../../fixtures/pages.fixture");
const { percySnapshot } = require("@percy/playwright");
const HomePage = require("../../POM/pages/HomePage");

test.describe("Visual regression @percy", () => {
  test("Home page logged out @percy", async ({ page, homePage }, testInfo) => {
    await homePage.openHome();
    await percySnapshot(page, `Home Page - ${testInfo.project.name}`);
  });
  test("Home page logged in @percy", async ({
    page,
    homePage,
    _apiLogin,
  }, testInfo) => {
    await homePage.openHome();
    await percySnapshot(page, `Home Page - ${testInfo.project.name}`);
  });
  test("Signup page logged in @percy", async ({
    page,
    homePage,
    _apiLogin,
  }, testInfo) => {
    await homePage.openHome();
    await page.goto("/signup");
    await percySnapshot(page, `Home Page - ${testInfo.project.name}`);
  });
  test("Pricing page logged in @percy", async ({
    page,
    homePage,
    _apiLogin,
  }, testInfo) => {
    await homePage.openHome();
    await page.goto("/signup?v=pricing");
    await percySnapshot(page, `Home Page - ${testInfo.project.name}`);
  });

  test.describe("@mobile Visual regression @percy", () => {
    test("Home page logged in @percy @mobile", async ({
      page,
      homePage,
      _apiLogin,
    }, testInfo) => {
      await homePage.openHome();
      await percySnapshot(page, `Home Page - ${testInfo.project.name}`);
    });
    test("@mobile Home page logged out @percy", async ({
      page,
      homePage,
    }, testInfo) => {
      await homePage.openHome();
      await percySnapshot(page, `Home Page - ${testInfo.project.name}`);
    });
    test("@mobile Signup page logged in @percy", async ({
      page,
      homePage,
      _apiLogin,
    }, testInfo) => {
      await homePage.openHome();
      await page.goto("/signup");
      await percySnapshot(page, `Home Page - ${testInfo.project.name}`);
    });
    test("@mobile Pricing page logged in @percy", async ({
      page,
      homePage,
      _apiLogin,
    }, testInfo) => {
      await homePage.openHome();
      await page.goto("/signup?v=pricing");
      await percySnapshot(page, `Home Page - ${testInfo.project.name}`);
    });
  });
});
