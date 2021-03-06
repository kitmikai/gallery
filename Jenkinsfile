pipeline {
    agent any
    environment {
        EMAIL_BODY =
            """
                <p>EXECUTED: Job <strong>\'${env.JOB_NAME}:${env.BUILD_NUMBER}\'</strong></p>
                <p>
                View console output at 
                "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
                </p> 
                <p><em>(Build log is attached.)</em></p>

            """
        EMAIL_SUBJECT_SUCCESS = "Status: 'SUCCESS' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'" 
        EMAIL_SUBJECT_FAILURE = "Status: 'FAILURE' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'"
        EMAIL_SUBJECT_TEST_FAILURE = "Status: 'TEST FAILURE' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'"
        EMAIL_RECEPIENT = 'matara.timothy@gmail.com'
        APP_URL = 'https://dry-springs-42834.herokuapp.com/'
    }
    tools {
        nodejs 'NodeJS-4'
    }
    stages {
        stage('Clone repo') {
            steps {
                git 'https://github.com/kitmikai/gallery'
            }
        }
        stage('Test Build'){
            steps{
                sh 'npm test'
            }
            post {
                failure {
                    emailext attachLog: true,
                    body: EMAIL_BODY,
                    subject: EMAIL_SUBJECT_TEST_FAILURE,
                    to: EMAIL_RECEPIENT
                }
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Deploy to Heroku') {
            steps {
                withCredentials([usernameColonPassword(credentialsId: 'Heroku', variable: 'HEROKU_CREDENTIALS')]){
                    sh 'git push https://${HEROKU_CREDENTIALS}@git.heroku.com/dry-springs-42834.git master'
                }
            }
            post {
                success {
                    slackSend color: "good", message: "Build \'${env.JOB_NAME}:${env.BUILD_NUMBER}\' successfully deployed to Heroku \n '${env.APP_URL}` :beer: :beer:"
                }
                failure {
                    slackSend color: "danger", message: "Build `${env.JOB_NAME}:${env.BUILD_NUMBER}` failed deployment to Heroku \n`${env.APP_URL}` :face_palm:"
                }
            }
        }
    }
    post {
        success {
            emailext attachLog: true, 
            body: EMAIL_BODY,
            subject: EMAIL_SUBJECT_SUCCESS, 
            to: EMAIL_RECEPIENT
        }
        failure {
            emailext attachLog: true, 
            body: EMAIL_BODY,
            subject: EMAIL_SUBJECT_FAILURE, 
            to: EMAIL_RECEPIENT
        }
    }
}