// tests/auth.setup.js
const { test, expect } = require("@playwright/test");
const BasePage = require("../POM/pages/BasePage");
const HeaderPartial = require("../POM/partials/HeaderPartial");
const LoginPage = require('../POM/pages/LoginPage');

let base;
let log;

test("save logged in state", async ({ page }) => {
  /**
   * @param BasePage basepage
   */
  log = new LoginPage(page);
  base = new BasePage(page);

  await page.goto("/login");

  await log.emailFill.fill(process.env.USER_EMAIL);
  await log.passwordFill.fill(process.env.USER_PASSWORD);
  await log.loginBtn.click();

  // wait for something that proves login worked
  await base.header.userMenu.first().click();
  await expect(page.getByText(`${process.env.USER_EMAIL}`)).toBeVisible();

  await page.context().storageState({
    path: "playwright/.auth/user.json",
  });
});
