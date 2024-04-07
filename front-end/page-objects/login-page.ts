import { Page, Locator } from "@playwright/test";
import { URLS } from "../data/constants";

export class LoginPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly logInButton: Locator;
    readonly logInLinkButton: Locator;
    readonly continueButton: Locator;

// Locators are all in the constructor to optimize centralization and good practices.
    constructor(page: Page){
        this.page = page;
        this.usernameInput = this.page.getByTestId('username');
        this.passwordInput = this.page.getByTestId('password')
        this.logInButton = this.page.getByRole('button', { name: 'Log in' })
        this.logInLinkButton = this.page.getByTestId('bignav').getByRole('link', { name: 'Log in' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });

    }
// Functions that perform actions. Function naming convention should be actions.
    async submitLogInForm(username: string, password: string){
        await this.page.goto(URLS.baseURL as string);
        await this.logInLinkButton.click();
        await this.usernameInput.fill(username);
        await this.continueButton.click();
        await this.passwordInput.fill(password);
        await this.logInButton.click();
    }
}