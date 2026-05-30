const { test, expect } = require("../../fixtures/pages.fixture");
const HomePage = require("../../POM/pages/HomePage");
const ListingPage = require("../../POM/pages/ListingPage");
const HeaderPartial = require("../../POM/partials/HeaderPartial");


test.describe("navigation tests", () => {
  test.use({ storageState: "playwright/.auth/user.json" });

  test("'create your own' worklow", async ({ page, homePage, signupPage }) => {
    await homePage.openHome();
    await expect(homePage.createYourOwn).toBeVisible();
    await homePage.createYourOwn.click();

    await expect(page).toHaveURL("/signup");
    await expect(signupPage.createYourCommunity).toBeVisible();
    await signupPage.createYourCommunity.click();
    await expect(page).toHaveURL("/signup?v=pricing");
  });
  test("listing link routes to correct page", async ({ page, homePage }) => {
    const listingNum = 1;

    await homePage.openHome();
    await expect(homePage.getListings(listingNum)).toBeVisible();

    const expectedName = await homePage.getListingName(listingNum);

    const [newTab] = await Promise.all([
      page.waitForEvent("popup"),
      homePage.getListings(listingNum).click(),
    ]);

    const list = new ListingPage(newTab);

    await expect(list.listingName).toHaveText(expectedName);
  });
  test("logo routes back to homepage", async ({
    page,
    homePage,
    profilePage,
  }) => {
    await homePage.openHome();
    await homePage.header.userMenu.first().click();
    await homePage.header.userMenuProfile.click();
    await expect(profilePage.profilePic).toBeVisible();
    const baseURL = process.env.BASE_URL;

    if (!baseURL) {
      throw new Error("BASE_URL is not defined");
    }

    await homePage.header.logo.click();

    await expect(page).toHaveURL(new URL("/", baseURL).toString());
  });
  test("user menu opens and shows expected options", async ({
    page,
    homePage,
  }) => {
    await homePage.openHome();
    await homePage.header.userMenu.first().click();
    await homePage.header.expectMenuOptionsVisible();
  });
  test("mobile menu opens and closes @mobile", async ({
    page,
    mobileHomePage,
    homePage,
  }) => {
    await mobileHomePage.openHome();
    await mobileHomePage.menuDropDown.click();
    await expect(mobileHomePage.menuDropDown).toBeVisible();
  });
});
