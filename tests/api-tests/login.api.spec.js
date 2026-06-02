const { test, expect } = require("@playwright/test");
const LoginApi = require("../../api/user.api");

test.describe("basic api tests", () => {
  test("api login", async ({ request }) => {
    const loginApi = new LoginApi(process.env.API_BASE_URL, request);

    const loginData = await loginApi.login(
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD,
    );

    const body = await loginData.text();

    console.log("BASE_URL exists:", !!process.env.BASE_URL);
    console.log("EMAIL exists:", !!process.env.EMAIL);
    console.log("PASSWORD exists:", !!process.env.PASSWORD);
    console.log("Final URL:", loginData.url());
    console.log("Status:", loginData.status());
    console.log("Body:", body);

    expect(loginData.status()).toBe(200);

    const setCookie = loginData.headers()["set-cookie"];
    expect(setCookie).toContain("auth_token");
  });
  test.use({ storageState: { cookies: [], origins: [] } });

  test("protected API rejects request without token", async ({ request }) => {
    const requestUrl =
      "https://api2.skool.com/self/notifications?limit=30&type=all";
    const response = await request.get(requestUrl);
    expect([401, 403]).toContain(response.status());
  });
});
