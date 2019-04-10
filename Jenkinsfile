stage('npm-build') {
    agent {
        docker {
            image 'node:10.15-slim'
        }
    }
    steps {
        echo "Branch is ${env.BRANCH_NAME}..."
 
        withNPM() {
            echo "Performing npm build..."
            sh 'npm install'
            sh 'npm build'
        }
    }
}
