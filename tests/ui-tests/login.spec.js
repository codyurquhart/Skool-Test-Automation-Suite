const { test, expect } = require("../../fixtures/pages.fixture");
const LoginPage = require("../../POM/pages/LoginPage");
const HomePage = require("../../POM/pages/HomePage");
const HeaderPartial = require("../../POM/partials/HeaderPartial");

test.describe("login authentication tests", () => {
  test("user can log in with valid credentials", async ({ page, homePage, _login }) => {
    await expect(page).toHaveURL('/');

    await homePage.header.userMenu.first().click();
    await expect(page.getByText(`${process.env.USER_EMAIL}`)).toBeVisible();
  });

  test("logged-in user sees account/user menu", async ({ page, homePage, _login }) => {
    await expect(page).toHaveURL('/');
    await homePage.header.userMenu.first().click();
    await expect(homePage.header.userMenuDropDown).toContainText(
      `${process.env.USER_EMAIL}`,
    );
  });

  test("user can log out", async ({ page, homePage, _login }) => {
    await expect(page).toHaveURL('/');
    await homePage.header.userMenu.first().click();
    await homePage.header.userMenuDropDown.getByText(/log out/i).click();
    await homePage.logoutPopUp
      .getByRole("button", { name: /log out/i })
      .click();
    await expect(page).toHaveURL("/login");
  });
});
test.describe("negative login tests", () => {
  test("login button disabled when fields are empty", async ({
    page,
    homePage,
    loginPage,
  }) => {
    await homePage.popupLogin();

    await loginPage.emailFill.clear();
    await loginPage.passwordFill.clear();
    await expect(loginPage.loginBtn).toBeDisabled();
  });

  test("user cannot login with invalid credentials", async ({
    page,
    homePage,
    loginPage,
  }) => {
    const error = homePage.incorrectPassword;

    await homePage.popupLogin();



    await loginPage.emailFill.fill(process.env.USER_EMAIL);
    await loginPage.passwordFill.fill("WrongPassword123!");
    await expect(loginPage.loginBtn).toBeEnabled();
    await loginPage.loginBtn.click();

    await expect(error).toBeVisible();
  });
});
