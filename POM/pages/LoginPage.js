const { expect } = require('@playwright/test');
class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailFill = page.getByLabel(/^email$/i);
    this.passwordFill = page.getByLabel(/^password$/i);
    this.loginBtn = page.locator('button[type="submit"]').filter({ hasText: /log in/i});
  }

  async login() {
    await this.emailFill.fill(process.env.USER_EMAIL);
    await this.passwordFill.fill(process.env.USER_PASSWORD);
    await this.loginBtn.click();
  }
}
module.exports = LoginPage;
