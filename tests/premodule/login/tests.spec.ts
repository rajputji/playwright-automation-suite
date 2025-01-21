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
        const [loginPage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.click("//div[text()='Sign In']")
        ]);
        await loginPage.waitForLoadState();

        await loginPage.fill('input[name="email"]', 'invalidemail@example.com');
        await loginPage.fill('input[name="password"]', 'InvalidPassword@123');

        await loginPage.click('button[type="submit"]');

        await expect(loginPage.locator('text=Invalid username/password')).toBeVisible();
    });

    test.only('@TC1004 Verify Forgot Password Link', async ({ page }) => {
        const [loginPage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.click("//div[text()='Sign In']")
        ]);
        await loginPage.waitForLoadState();

        await loginPage.click('a:has-text("Forgot Password?")');

        await expect(loginPage.locator('text=Send Reset Link')).toBeVisible();
    });
});
