import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/features/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    baseUrl: 'https://practicetestautomation.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
