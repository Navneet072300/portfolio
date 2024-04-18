pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                // Install Node.js and npm
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                // Build the React app
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                // Run tests if you have them
                sh 'npm run test'
            }
        }
    }

    post {
        success {
            // Notify success
            echo 'Build successful! Your React app is ready for deployment.'
        }
        failure {
            // Notify failure
            echo 'Build failed! Check the Jenkins console output for details.'
        }
    }
}
