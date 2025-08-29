// cypress-cucumber-preprocessor.config.cjs
// CommonJS

module.exports = {
  // Dónde están tus step definitions
  stepDefinitions: ["cypress/e2e/steps/**/*.{ts,js}"],

  // Filtrado por tags (lee TAGS desde el entorno de Cypress)
  // Ejemplo: CYPRESS_TAGS="@smoke and not @wip" npx cypress run
  // Estos flags evitan ejecutar/mostrar escenarios que no matchean
  filterSpecs: true,
  omitFiltered: true,

  // Reports del preprocesador (útiles en CI o para parsers externos)
  // Messages NDJSON (cucumber-messages) y JSON cucumber
  messages: {
    enabled: true,
    output: "cucumber-messages.ndjson"
  },
  json: {
    enabled: true,
    output: "cucumber-report/cucumber.json"
  }

  // Otros ajustes opcionales (descomenta según necesidad):
  // stepDefinitions: ["cypress/e2e/**/steps/**/*.{ts,js}", "cypress/support/steps/**/*.{ts,js}"],
  // html: { enabled: true, output: "cucumber-report/html" }, // si usas el HTML del preprocesador
};
