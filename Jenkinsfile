pipeline {
    agent any
    environment {
        NODEJS_HOME = tool name: 'NodeJS_20', type: 'nodejs'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run Cypress Tests') {
            steps {
                bat 'npm run cucumber'
            }
        }
        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'cypress/reports/html/**', allowEmptyArchive: true
            }
        }
    }
    post {
        always {
            junit 'cypress/reports/html/*.xml'
        }
    }
}
