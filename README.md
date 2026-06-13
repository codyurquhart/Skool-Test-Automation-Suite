# Breakdown of Test Suite for "Skool.com"

### Some key features implimented

- Utilized a [Token Authorized save state](https://github.com/codyurquhart/Skool-Test-Automation-Suite/blob/main/tests/auth-setup.spec.js) to increase efficiency of [smoke tests](https://github.com/codyurquhart/Skool-Test-Automation-Suite/blob/main/tests/ui-tests/smoke-test.spec.js)
- Split POM into a separate partials for the [Header](https://github.com/codyurquhart/Skool-Test-Automation-Suite/blob/main/POM/partials/HeaderPartial.js) and included access to the header within the [BasePage](https://github.com/codyurquhart/Skool-Test-Automation-Suite/blob/main/POM/pages/BasePage.js) constructor.  This allows easy access to header locators and methods for each page through calls such as 'BasePage.header' and 'HomePage.header'.
- Set separate config and yml files for [Playwright](https://github.com/codyurquhart/Skool-Test-Automation-Suite/blob/main/playwright.config.js) [workflow](https://github.com/codyurquhart/Skool-Test-Automation-Suite/blob/main/.github/workflows/playwright.yml) and [Percy](https://github.com/codyurquhart/Skool-Test-Automation-Suite/blob/main/playwright.percy.config.js) [workflow](https://github.com/codyurquhart/Skool-Test-Automation-Suite/blob/main/.github/workflows/percy.yml) to allow manual control over these two pipelines.


This test suite includes tests for both browser and mobile as well as manual workflow for visual regressions tests that link to a Percy.io Build.
