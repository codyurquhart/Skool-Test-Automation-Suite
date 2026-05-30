const HeaderPartial = require("../partials/HeaderPartial");
const FooterPartial = require("../partials/FooterPartial");
require("dotenv").config();

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.header = new HeaderPartial(page);
    this.footer = new FooterPartial(page);
  }

  async goto(path = "/") {
    const baseUrl = process.env.BASE_URL;

    if (!path) throw new Error("BASE_URL is missing");

    const url = new URL(path, baseUrl).toString();

    await this.page.goto(url);

    return this.page.url();
  }

  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scroll(0, document.body.scrollHeight);
    });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("load");
  }
}

module.exports = BasePage;
