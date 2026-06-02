// @ts-check
const { defineConfig, devices } = require("@playwright/test");

require("dotenv").config();

module.exports = defineConfig({
  testDir: "./tests",

  testIgnore: ['**/visual-regression.spec.js'],

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    baseURL: process.env.BASE_URL,

    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    actionTimeout: 15_000,
    navigationTimeout: 30_000,

    ignoreHTTPSErrors: false,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      grepInvert: /@mobile|@percy/,
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      grepInvert: /@mobile|@percy/,
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      grepInvert: /@mobile|@percy/,
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5']},
      grep: /@mobile|@percy/,
      
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12']},
      grep: /@mobile|@percy/,
    },
  ],

  outputDir: "test-results",
});
