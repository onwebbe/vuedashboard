pipeline {
    agent {
        docker {
            image 'ebiven/vue-cli:latest'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Install') {
            steps {
                sh 'rm -rf /var/jenkins_home/workspace/VUEDashboard/node_modules'
                sh 'rm /var/jenkins_home/workspace/VUEDashboard/package-lock.json'
                sh 'npm cache clear--force'
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'echo build'
                sh 'npm run build'
            }
        }
    }
}
