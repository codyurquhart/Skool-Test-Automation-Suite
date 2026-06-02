const { expect } = require("@playwright/test");
const BasePage = require("../pages/BasePage");
const LoginPage = require("../pages/LoginPage");

class HomePage extends BasePage {
  constructor(page) {
    super(page);

    this.loginPopup = page
      .locator('[class*="styled__ModalWrapper"]')
      .filter({ hasText: /log in to skool/i });

    const loginModal = this.loginPopup;
    this.popupEmail = page.locator('input[type="email"]');
    this.popupPassword = page.locator('input[type="password"]');
    this.popupLoginBtn = loginModal.getByRole("button", {
      name: /^log in$/i,
    });

    this.logoutPopUp = page.locator(".styled__ModalWrapper-sc-7eym6d-0");

    this.incorrectPassword = page.locator(".styled__InputError-sc-1saiqqb-6");

    this.searchBar = page.getByPlaceholder(/search/i);

    this.filterBtn = page.getByRole("button", { name: /filter/i });
    this.filterMenu = page.locator(
      'div[class*="styled__DesktopFiltersContent"]',
    );
    this.freeCheckbox = this.filterMenu.getByText("Free", { exact: true });
    this.paidCheckbox = this.filterMenu.getByText(/paid/i);

    this.createYourOwn = page.getByRole("link", { name: /create your own/i });
  }

  async navigateToLogin() {
    await this.openHome();
    await expect(this.loginBtn).toBeVisible();
    await this.header.loginBtn.click();
  }

  async login() {
    await this.popupEmail.fill(process.env.USER_EMAIL);
    await this.popupPassword.fill(process.env.USER_PASSWORD);
    await this.popupLoginBtn.click();
  }

  async openPopupLogin() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForTimeout(1000);
    await expect(this.header.loginBtn).toBeVisible();
    await expect(this.header.loginBtn).toBeEnabled();
    await this.header.loginBtn.click();

    await expect(this.loginPopup).toBeVisible();
    await expect(this.popupEmail).toBeVisible();
  }

  getListingPayStatus(searchTerm, number = 1) {
    return this.getSearchResultByNumber(searchTerm, number).locator(
      'div[class*="DiscoveryCardMeta"]',
    );
  }

  getSearchResultByNumber(searchTerm = "", number = 1) {
    return this.page
      .locator('div[class*="DiscoveryCards"]')
      .getByRole("link", { name: new RegExp(searchTerm, "i") })
      .nth(number - 1);
  }

  getListingByName(searchTerm) {
    return this.page.getByRole("link", {
      name: new RegExp(searchTerm, "i"),
    });
  }

  getListingName(searchTerm = "", number = 1) {
    return this.getSearchResultByNumber(searchTerm, number)
      .locator('span[class*="GroupNameWrapper"]')
      .innerText();
  }

  async openHome() {
    await this.goto();
    await this.waitForPageLoad();
  }

  async expectHomeLoaded() {
    await expect(this.page).toHaveURL("/");
  }

  async openMoreInformation() {
    await this.moreInformationLink.click();
  }

  async checkNavigationVisible() {}
}

module.exports = HomePage;
