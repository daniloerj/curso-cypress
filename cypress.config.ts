import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
// 👇 En ESM/TS, este import debe ser *default*
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    baseUrl: "https://practicetestautomation.com",
    specPattern: "**/*.feature",
    supportFile: "cypress/support/e2e.ts", // cámbialo a false si no usarás support
    async setupNodeEvents(on, config) {
      // 1) registra el plugin de cucumber (es async)
      await addCucumberPreprocessorPlugin(on, config);

      // 2) registra el bundler con el plugin de cucumber para esbuild
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // 3) SIEMPRE devolver config
      return config;
    },
  },
});
