pipeline {
    agent {
        docker {
            image 'onwebbe/node-curl-python-alpine:latest'
            args '-p 3000:3000 -v /var/jenkins_home/workspace/VUEDashboard/:/working'
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Install') {
            steps {
                sh 'pwd'
                sh 'cd /working'
                sh 'rm -rf /working/node_modules'
                sh 'rm /working/package-lock.json'
                // sh 'npm cache clear--force'
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
