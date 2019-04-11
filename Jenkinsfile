pipeline {
    agent {
        docker {
            image 'vebiven/vue-cli:latest'
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
                sh 'echo build'
                sh 'npm run test:unit'
            }
        }
    }
}
