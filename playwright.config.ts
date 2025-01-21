import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    use: {
        headless: true,
        screenshot: 'on',
        video: 'on',
        trace: 'retain-on-failure'
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            },
        },

    ],
});
