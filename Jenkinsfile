pipeline {
  agent any
  tools {
    maven '3.9.4'
    nodejs '20.6.0'
  }
  stages {
    stage('Build Maven') {
      steps {
        bat """
            cd springboot-backend
            mvn clean install -DskipTests
        """.stripIndent().trim()
      }
    }
    stage('Instal Node Dependencies') {
      steps {
        bat """
            cd react-frontend
        """.stripIndent().trim()
      }
    }
    stage('Build Spring Boot Backend Docker Image') {
      steps{
        bat """
            cd springboot-backend
            docker build -t clh7090/job-listings-springboot-backend .
            cd ../react-frontend
            docker build -t clh7090/job-listings-react-frontend .
        """.stripIndent().trim()
      }
    }
    stage('Push Image to Docker Hub') {
      steps{
        withCredentials([string(credentialsId: 'dockerhubpwd', variable: 'dockerhubpwd')]) {
          bat """
            docker login -u clh7090 -p {dockerhubpwd}
            docker push clh7090/job-listings-springboot-backend
            docker push clh7090/job-listings-react-frontend
          """.stripIndent().trim()
        } 
      }
    }
  }
}
