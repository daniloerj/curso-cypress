pipeline {
  agent { label 'windows' }

  options {
    ansiColor('xterm')
    timestamps()
  }

  parameters {
    string(name: 'BASE_URL', defaultValue: 'https://practicetestautomation.com', description: 'Sobrescribe Cypress baseUrl (CYPRESS_baseUrl)')
    choice(name: 'BROWSER', choices: ['electron', 'chrome'], description: 'Navegador headless')
    string(name: 'TAGS', defaultValue: 'not @ignore', description: 'Filtro de tags Cucumber (@badeball). Ej: "@smoke and not @wip"')
  }

  environment {
    NODEJS_HOME = tool name: 'NodeJS_20', type: 'nodejs'
    // En Windows usa ';' y backslashes
    PATH = "${NODEJS_HOME}\\bin;${env.PATH}"
    JAVA_TOOL_OPTIONS = '-Dfile.encoding=UTF-8'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install deps') {
      steps {
        bat 'chcp 65001 >NUL & npm ci'
      }
    }

    stage('Clean artifacts (opcional)') {
      steps {
        // No falla si no existe el script "clean"
        bat 'chcp 65001 >NUL & cmd /c "npm run clean || exit /b 0"'
      }
    }

    stage('Run Cypress (BDD)') {
      steps {
        // Pasa parámetros a Cypress por env y CLI
        bat """
          chcp 65001 >NUL
          set CYPRESS_baseUrl=${params.BASE_URL}
          set CYPRESS_TAGS=${params.TAGS}
          npm run cucumber -- --browser ${params.BROWSER} --headless
        """
      }
    }

    stage('Archive artifacts') {
      steps {
        archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**, allure-results/**, cypress/reports/junit/*.xml', allowEmptyArchive: true
      }
    }
  }

  post {
    always {
      // Publica tests en JUnit (el config escribe en cypress/reports/junit/*.xml)
      junit testResults: 'cypress/reports/junit/*.xml', allowEmptyResults: true

      // Publica Allure (usa el plugin de Jenkins)
      allure results: [[path: 'allure-results']], reportBuildPolicy: 'ALWAYS'
    }
  }
}
