// CommonJS: sin defineConfig
module.exports = {
  // dónde están tus steps
  stepDefinitions: ["cypress/e2e/steps/**/*.{ts,js}"],

  // extras opcionales:
  // messages: { enabled: true },
  // json: { enabled: true, output: "cucumber-report/cucumber.json" },
};
