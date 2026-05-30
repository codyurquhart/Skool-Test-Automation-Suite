const { expect } = require("@playwright/test");
const BasePage = require("../pages/BasePage");
const LoginPage = require('../pages/LoginPage');

class SignupPage {
    constructor(page) {
        this.page = page;

        this.createYourCommunity = page.getByRole('button', { name: /create your community/i });

    }
}
module.exports = SignupPage;