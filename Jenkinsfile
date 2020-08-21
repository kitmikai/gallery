pipeline {
    agent any
    tools {
        nodejs 'NodeJS-4'
    }
    stages {
        stage('Clone repo') {
            steps {
                git 'https://github.com/kitmikai/gallery'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Deploy to Heroku') {
            steps {
                withCredentials([usernameColonPassword(credentialsId: 'Heroku', variable: 'HEROKU_CREDENTIALS' )]){
                    sh 'git push https://${HEROKU_CREDENTIALS}@git.heroku.com/thawing-coast-90459.git master'
                }
            }
        }
    }
}