const { test, expect } = require("../../fixtures/pages.fixture");
const LoginPage = require("../../POM/pages/LoginPage");
const HomePage = require("../../POM/pages/HomePage");
const HeaderPartial = require("../../POM/partials/HeaderPartial");

test.describe("login authentication tests", () => {
  test("user can log in with valid credentials", async ({ page, homePage }) => {

    await homePage.openHome();
    await homePage.openPopupLogin();
    await homePage.login();
  });

  test("logged-in user sees account/user menu", async ({ page, _apiLogin, homePage }) => {
    await homePage.openHome();
    await expect(page).toHaveURL('/');
    await homePage.header.userMenu.first().click();
    await expect(homePage.header.userMenuDropDown).toContainText(
      `${process.env.USER_EMAIL}`,
    );
  });

  test("user can log out", async ({ page, _apiLogin, homePage,}) => {
    await homePage.openHome();
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
  }) => {
    await homePage.openHome();
    await homePage.openPopupLogin();

    await expect(homePage.loginPopup).toBeVisible();
    await homePage.popupEmail.clear();
    await homePage.popupPassword.clear();
    await expect(homePage.popupLoginBtn).toBeDisabled();
  });

  test("user cannot login with invalid credentials", async ({
    page,
    homePage,
    loginPage,
  }) => {
    const error = homePage.incorrectPassword;
    await homePage.openHome();

    await homePage.openPopupLogin();
    await expect(homePage.loginPopup).toContainText(/email/i);



    await homePage.popupEmail.fill(process.env.USER_EMAIL);
    await homePage.popupPassword.fill("WrongPassword123!");
    await homePage.popupLoginBtn.click();

    await expect(error).toBeVisible();
  });
});
