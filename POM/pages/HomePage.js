const { expect } = require("@playwright/test");
const BasePage = require("../pages/BasePage");
const LoginPage = require("../pages/LoginPage");

class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    //logged out state
    this.loginBtn = page.getByRole("button", { name: /log in/i }).nth(0);
    //---------------------//

    this.logoutPopUp = page.locator(".styled__ModalWrapper-sc-7eym6d-0");

    this.incorrectPassword = page.locator(".styled__InputError-sc-1saiqqb-6");

    this.allListings = page.locator(
      'div[class*="DiscoveryCards"] > a[class*="ChildrenLink"]',
    );

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
    await this.loginBtn.click();
  }

  async popupLogin() {
    await this.openHome();
    await expect(this.loginBtn).toBeVisible();
    await expect(this.loginBtn).toBeEnabled();
    await this.loginBtn.click();
    await expect(this.page.locator("#email")).toBeVisible({ timeout: 10000 });
  }

  getListingPayStatus(num) {
    return this.getListings(num).locator(
      'div[class*="styled__DiscoveryCardMeta"]',
    );
  }

  getListings(num) {
    return this.allListings.nth(num - 1);
  }

  getListingName(num) {
    return this.getListings(num)
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
