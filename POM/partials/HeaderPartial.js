const { expect } = require('@playwright/test');

class HeaderPartial {
  constructor(page) {
    this.page = page;

    this.headerLayout = page.locator('[class*="styled__NavContainer-sc-vae51c-2"]');

    this.logo = this.headerLayout.locator('a[href="/"]');

    this.loginBtn = this.headerLayout.getByRole('button', { name: /log in/i }).first();

    this.userMenu = this.headerLayout.locator('img[src]');
    this.userMenuDropDown = page.locator('.styled__DropdownBackground-sc-1c1jt59-11');
    this.userMenuProfile = this.userMenuDropDown.getByText(/profile/i);
    this.userMenuSettings = this.userMenuDropDown.getByText(/Settings/i);
    this.userMenuAffiliates = this.userMenuDropDown.getByText(/Affiliates/i);
    this.userMenuHelp = this.userMenuDropDown.getByText(/Help Center/i);
    this.userMenuCreate = this.userMenuDropDown.getByText(/Create a community/i);
    this.userMenuDiscover = this.userMenuDropDown.getByText(/Discover communities/i);
    this.userMenuLogout = this.userMenuDropDown.getByText(/Log out/i);

    this.notificationBtn = this.headerLayout.locator('button[class*="styled__ButtonWrapper-sc-1crx28g-1"][class*="styled__NotificationsIconButton"]').first();
    this.notificationBtnClicked = page.locator('div[class*="styled__NotificationsHeader"]').filter({ hasText: 'Notifications'});

    this.communityDropDown = this.headerLayout.locator('button[class*="styled__DropdownButton"]');
    this.communitySearchFill = page.getByPlaceholder('Search').first();

    this.chatsBtn = this.headerLayout.locator('button[class*="styled__ChatNotificationsIconButton-sc-14ipnak-0"]').first();
    this.chatsBtnSearchFill = page.getByPlaceholder('Search users');
    
    this.navigationLocators = [
      this.headerLayout,
      this.userMenu,
      this.notificationBtn,
      this.communityDropDown,
      this.chatsBtn,
    ];

    this.userMenuOptions = [
      this.userMenuProfile,
      this.userMenuSettings,
      this.userMenuAffiliates,
      this.userMenuHelp,
      this.userMenuCreate,
      this.userMenuDiscover,
      this.userMenuLogout,
    ];
  }

  async expectMenuOptionsVisible() {
    for (const locator of this.userMenuOptions) {
      await expect(locator).toBeVisible();
    }
  }


  async expectNavigationVisible() {
    for (const locator of this.navigationLocators) {
      await expect(locator).toBeVisible();
    }
  }
}
module.exports = HeaderPartial;
