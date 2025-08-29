# Cypress Automation Project

Este proyecto implementa automatización de pruebas web para [Practice Test Automation](https://practicetestautomation.com/practice-test-login/) usando Cypress, TypeScript, Cucumber y el patrón Page Object Model (POM).

## Estructura del Proyecto
- **Cypress**: Framework principal de automatización.
- **TypeScript**: Tipado estático y mejor mantenibilidad.
- **Cucumber**: Escenarios de prueba en archivos `.feature`.
- **Page Object Model**: Separación de lógica de interacción con la UI.

## Instalación
```bash
npm install
```

## Ejecución de Pruebas
```bash
npm run test
```

## Integraciones
- **Jenkins**: Pipeline definido en `Jenkinsfile` para ejecución en Windows y descarga de reportes.
- **GitHub Actions**: Workflow en `.github/workflows/cypress.yml` para ejecución automática y descarga de reportes HTML.

## Reportes
Los reportes HTML se generan en `cypress/reports/html` y pueden ser descargados desde Jenkins y GitHub Actions.

## Escenarios Automatizados
- Login exitoso
- Login con usuario inválido
- Login con contraseña inválida
- Login con campos vacíos

## Autor
Danilo Efrain

## Licencia
MIT
