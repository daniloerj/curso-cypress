# Cypress Automation Project · TS + Cucumber + POM + Allure

Automatización E2E para **[Practice Test Automation – Login](https://practicetestautomation.com/practice-test-login/)** usando **Cypress 13**, **TypeScript**, **Cucumber (BDD)** y **Page Object Model (POM)**.  
Listo para **GitHub Actions** y **Jenkins**, con **Allure** + **JUnit**, videos y screenshots.

---

## Tabla de contenido
- [Requisitos](#requisitos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Ejecución de pruebas](#ejecución-de-pruebas)
- [Opciones útiles](#opciones-útiles)
- [Reportes](#reportes)
- [Integración CI/CD](#integración-cicd)
  - [GitHub Actions](#github-actions)
  - [Jenkins](#jenkins)
- [Convenciones BDD (tags)](#convenciones-bdd-tags)
- [Solución de problemas](#solución-de-problemas)
- [Autor y licencia](#autor-y-licencia)

---

## Requisitos
- **Node.js 20+**
- **npm 9+**
- (Opcional) **Java 11/17+** si vas a invocar el JAR de Allure manualmente.

---

## Estructura del proyecto
```
cypress/
  e2e/
    features/
      login.feature
    steps/
      login.steps.ts
  pages/
    LoginPage.ts
  support/
    e2e.ts
  reports/
    junit/               # JUnit XML (para Jenkins/GH Checks)
screenshots/
videos/
allure-results/          # resultados crudos (Allure)
allure-report/           # HTML (cuando se genera en CI/local)
cypress.config.ts        # config optimizada para CI
cypress-cucumber-preprocessor.config.(ts|cjs|mjs)
tsconfig.json
Jenkinsfile
.github/workflows/e2e.yml
```

---

## Instalación
```bash
npm ci
# o, si es la primera vez:
npm install
```

---

## Ejecución de pruebas
### Local (rápido)
```bash
npm run cucumber              # cypress run (headless, browser por defecto)
npm run cucumber:chrome       # cypress run --browser chrome --headless
npm run cucumber:electron     # cypress run --browser electron --headless
```

### Overriding de entorno (sin tocar el repo)
```bash
# Cambiar baseUrl en tiempo de ejecución
CYPRESS_baseUrl=https://practicetestautomation.com npm run cucumber

# Filtrar por tags Cucumber
CYPRESS_TAGS='@smoke and not @wip' npm run cucumber
```

> En Windows PowerShell:
> ```powershell
> $env:CYPRESS_baseUrl="https://practicetestautomation.com"; npm run cucumber
> ```

---

## Opciones útiles
- **Videos/Screenshots**: habilitados por defecto (se archivan en CI).
- **Retries** en CI: reduce flaky noise.
- **Viewport** fijo para consistencia visual.
- **Timeouts** ajustados para red real.

Todo configurado en `cypress.config.ts`.

---

## Reportes
### Allure
- El **runtime** de Allure está integrado. Al ejecutar pruebas se crea `allure-results/`.
- Generar y abrir reporte **local** (Windows con espacios en rutas -> usa PowerShell):
  ```powershell
  & "$PWD\node_modules\.bin\allure" generate "allure-results" --clean -o "allure-report"
  & "$PWD\node_modules\.bin\allure" open "allure-report"
  ```
  En Linux/macOS:
  ```bash
  npx allure generate "allure-results" --clean -o "allure-report"
  npx allure open "allure-report"
  ```

### JUnit
- Se genera en `cypress/reports/junit/*.xml` para métricas en Jenkins y resumen en Pull Requests.

---

## Integración CI/CD

### GitHub Actions
- Workflow listo en `.github/workflows/e2e.yml`:
  - Cachea `npm ci`.
  - Matriz de navegadores (chrome/electron) **opcional**.
  - Sube videos, screenshots, **JUnit**, **allure-results** y **allure-report** como artefactos.
  - Despliega **Allure HTML** a **GitHub Pages** (rama `main`).

**Overrides por `workflow_dispatch`:**
- `base_url`: sobrescribe `CYPRESS_baseUrl`.
- `tags`: filtra escenarios Cucumber (e.g., `@smoke and not @wip`).

### Jenkins
- `Jenkinsfile` preparado para agente **Windows**:
  - `npm ci`, ejecución con `npm run cucumber`.
  - Archiva videos/screenshots y `allure-results/`.
  - Publica **JUnit** y **Allure** (plugin Allure Jenkins).
  - Parámetros: `BASE_URL`, `BROWSER`, `TAGS`.

---

## Convenciones BDD (tags)
- `@smoke`: flujo crítico y rápido.
- `@regression`: set amplio.
- `@wip`: en progreso (se excluye por defecto en CI con `not @ignore` / `not @wip`).
  
Ejemplo CLI:
```bash
CYPRESS_TAGS='@smoke and not @wip' npm run cucumber
```

---

## Solución de problemas
**1) “`cy.visit()` carga 404 local”**  
Define `baseUrl` y usa rutas relativas:
```ts
// cypress.config.ts
baseUrl: "https://practicetestautomation.com"
// en pasos/PO:
cy.visit("/practice-test-login/");
```

**2) Allure falla con `reportAllureCypressSpecMessages`**  
Asegúrate de:
- `import "allure-cypress"` en `cypress/support/e2e.ts`
- `allureCypress(on, config, { resultsDir: "allure-results" })` en `setupNodeEvents`.

**3) Windows + rutas con espacios**  
Invoca Allure con **PowerShell** usando el operador `&`:
```powershell
& "$PWD\node_modules\.bin\allure" generate "allure-results" --clean -o "allure-report"
```

**4) Consola Jenkins con caracteres raros (`[90m`, `â”Œ`)**  
Activa ANSI + UTF-8:
- Plugin **AnsiColor** y `options { ansiColor('xterm') }`.
- `chcp 65001 >NUL` antes de `npm run`.
- `JAVA_TOOL_OPTIONS='-Dfile.encoding=UTF-8'`.

---

## Autor y licencia
**Autor:** Danilo Efrain  
**Licencia:** MIT

> “Automatizar es para todos.” Mantén el pipeline sobrio, los reportes elegantes y los flakies a raya. Eso es liderazgo técnico con criterio.
