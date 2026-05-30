const { test, expect } = require("../fixtures/pages.fixture");
const HeaderPartial = require("../POM/partials/HeaderPartial");
const FooterPartial = require("../POM/partials/FooterPartial");
const HomePage = require("../POM/pages/HomePage");
/** @type {HomePage} */
let home;

test.describe("locator debugging", () => {
  // test.use({ storageState: "playwright/.auth/user.json" });
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
  });
  test("locator test @mobile", async ({ page, _login, mobileHomePage }) => {
    await expect(mobileHomePage.menuDropDown).toBeVisible();
  });
  test('find listing source', async ({ page }) => {
  page.on('response', async (response) => {
    const contentType = response.headers()['content-type'] || '';

    if (
      !contentType.includes('text/html') &&
      !contentType.includes('json')
    ) {
      return;
    }

    try {
      const text = await response.text();

      if (
        text.includes('Clief Notes') ||
        text.includes('AI Video Bootcamp') ||
        text.includes('AIS')
      ) {
        console.log(
          'FOUND LISTING DATA:',
          response.status(),
          response.request().method(),
          response.url()
        );
      }
    } catch (error) {
      // Some responses cannot be read safely
    }
  });

  await page.goto('https://www.skool.com/');
  await page.waitForTimeout(5000);
});
});