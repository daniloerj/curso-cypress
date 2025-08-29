pipeline {
  agent any

  options { ansiColor('xterm') timestamps() }

  parameters {
    string(name: 'BASE_URL', defaultValue: 'https://practicetestautomation.com', description: 'CYPRESS_baseUrl')
    choice(name: 'BROWSER', choices: ['electron', 'chrome'], description: 'Navegador headless (electron no requiere Chrome instalado)')
    string(name: 'TAGS', defaultValue: 'not @ignore', description: 'Filtro de tags Cucumber (ej: "@smoke and not @wip")')
  }

  environment {
    JAVA_TOOL_OPTIONS = '-Dfile.encoding=UTF-8'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install deps') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm ci || npm install'
          } else {
            bat 'chcp 65001 >NUL & (npm ci || npm install)'
          }
        }
      }
    }

    stage('Run Cypress (BDD)') {
      steps {
        script {
          def cmd = "npm run cucumber -- --browser ${params.BROWSER} --headless"
          if (isUnix()) {
            withEnv(["CYPRESS_baseUrl=${params.BASE_URL}", "CYPRESS_TAGS=${params.TAGS}"]) {
              sh cmd
            }
          } else {
            withEnv(["CYPRESS_baseUrl=${params.BASE_URL}", "CYPRESS_TAGS=${params.TAGS}"]) {
              bat "chcp 65001 >NUL & ${cmd}"
            }
          }
        }
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
      junit testResults: 'cypress/reports/junit/*.xml', allowEmptyResults: true
      // Requiere plugin "Allure Jenkins"
      allure results: [[path: 'allure-results']], reportBuildPolicy: 'ALWAYS'
    }
  }
}
