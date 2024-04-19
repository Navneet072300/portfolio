pipeline {
    agent any
    stages {
        stage("checkout"){
            steps{
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install Node.js and npm
                bat 'sudo apt install npm'
            }
        }
        stage('Build') {
            steps {
                // Build the React app
                bat 'npm run build'
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
