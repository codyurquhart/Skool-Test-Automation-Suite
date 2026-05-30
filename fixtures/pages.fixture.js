const { test: base, expect } = require('@playwright/test');
const HomePage = require('../POM/pages/HomePage');
const LoginApi = require('../api/user.api');
const LoginPage = require('../POM/pages/LoginPage');
const HeaderPartial = require('../POM/partials/HeaderPartial');
const ProfilePage = require('../POM/pages/ProfilePage');
const MobileHomePage = require('../POM/mobile-pages/MobileHomePage');
const ListingPage = require('../POM/pages/ListingPage');
const SignupPage = require('../POM/pages/SignupPage');

const test = base.extend({
 
  loginPage: async ({ page }, use) => {
    const log = new LoginPage(page);
    await use(log);
  },

  homePage: async ({ page }, use) => {
    const home = new HomePage(page);
    await use(home);
  },

  profilePage: async ({ page }, use) => {
    const profile = new ProfilePage(page);
    await use(profile);
  },

  listingPage: async ({ page }, use) => {
    const listing = new ListingPage(page);
    await use(listing);
  },

  signupPage: async ({ page }, use) => {
    const signup = new SignupPage(page);
    await use(signup);
  },

  mobileHomePage: async ({ page }, use) => {
    const mobileHome = new MobileHomePage(page);
    await use(mobileHome);
  },

_login: async ({ page, homePage, loginPage }, use) => {
  await homePage.popupLogin();
  await loginPage.login();
  await use(page, homePage, loginPage);

},

})
module.exports = { test, expect };
