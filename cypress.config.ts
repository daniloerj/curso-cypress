// cypress.config.ts (ESM/TS)
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
// 👇 OJO: import nombrado, no default
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    supportFile: "cypress/support/e2e.ts",
    baseUrl: "https://practicetestautomation.com",

    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    retries: { runMode: 2, openMode: 0 },
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      allureCypress(on, config, { resultsDir: "allure-results" });

      // Permite overrides por CI (Actions/Jenkins)
      const envBaseUrl = process.env.CYPRESS_baseUrl || process.env.BASE_URL || config.baseUrl;
      if (envBaseUrl) config.baseUrl = envBaseUrl;

      return config;
    },
  },

  reporter: "junit",
  reporterOptions: {
    mochaFile: "cypress/reports/junit/results-[hash].xml",
    toConsole: true
  }
});
