const { expect } = require("@playwright/test");

class FooterPartial {
  constructor(page) {
    this.page = page;

    this.footerLayout = page.locator('.styled__PaginationWrapper-sc-jt9hr-9');

    this.communityLink = this.footerLayout.filter({ hasText: "Community"});


  }
}
module.exports = FooterPartial;
