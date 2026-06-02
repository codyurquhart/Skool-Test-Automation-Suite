// tests/auth.setup.js
const { test, expect } = require("../fixtures/pages.fixture");
const BasePage = require("../POM/pages/BasePage");
const HeaderPartial = require("../POM/partials/HeaderPartial");
const LoginPage = require('../POM/pages/LoginPage');



test("save logged in state", async ({ _apiLogin, page, homePage, loginPage }) => {

  await page.goto("/");


  await homePage.header.userMenu.first().click();
  await expect(page.getByText(`${process.env.USER_EMAIL}`)).toBeVisible();

  await page.context().storageState({
    path: "playwright/.auth/user.json",
  });
});
