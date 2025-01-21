import { test, expect } from '@playwright/test';

test.describe('@login Login Functionality', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.copilot.live/');
    });

    test('@TC1001 Verify Landing Page Title', async ({ page }) => {
        const title = await page.title();
        expect(title).toBe('Copilot - Custom GPT chatbot for your website');
    });

    test('@TC1002 Verify Login With Valid Credentials', async ({ page }) => {
        
        page.screenshot();
        const [loginPage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.click("//div[text()='Sign In']")
        ]);
        await loginPage.waitForLoadState();

        await loginPage.fill('input[name="email"]', 'somevaliduser@gmail.com');
        await loginPage.fill('input[name="password"]', 'ValidPassword@123');

        await loginPage.click('button[type="submit"]');
        loginPage.screenshot();

        await loginPage.waitForURL('**\/choose-company');
        page.screenshot();

        await loginPage.click("//div[text()='Testing UAT']");
        page.screenshot();

        // Verify that the dashboard is visible after login
        await expect(page.locator("//div[text()=' Dashboard']")).toBeVisible();
        page.screenshot();
    });

    test('@TC1003 Verify Login With Invalid Credentials', async ({ page }) => {
        // Click on the "Sign In" button
        await page.click('button:has-text("Sign In")');

        // Wait for the login popup to open
        const [loginPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.click('button:has-text("Sign In")')
        ]);

        // Wait for the login page to load
        await loginPage.waitForLoadState();

        // Enter invalid email and password
        await loginPage.fill('input[name="email"]', 'invalid-email@example.com');
        await loginPage.fill('input[name="password"]', 'invalid-password');

        // Click on the "Sign In" button on the login page
        await loginPage.click('button[type="submit"]');

        // Verify that an error message is displayed
        await expect(loginPage.locator('text=Invalid email or password')).toBeVisible();
    });

    test('@TC1004 Verify Forgot Password Link', async ({ page }) => {
        // Click on the "Sign In" button
        await page.click('button:has-text("Sign In")');

        // Wait for the login popup to open
        const [loginPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.click('button:has-text("Sign In")')
        ]);

        // Wait for the login page to load
        await loginPage.waitForLoadState();

        // Click on the "Forgot Password?" link
        await loginPage.click('a:has-text("Forgot Password?")');

        // Verify that the forgot password page is displayed
        await expect(loginPage.locator('text=Reset your password')).toBeVisible();
    });
});
