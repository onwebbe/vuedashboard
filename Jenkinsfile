pipeline {
    agent {
        docker {
            image 'node:10.15-slim'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'echo postinsall'
                sh 'npm run postinstall'
                sh 'echo build'
                sh 'npm run test:unit'
            }
        }
    }
}
