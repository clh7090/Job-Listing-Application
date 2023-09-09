pipeline {
  agent any
  tools {
    maven '3.9.4'
  }
  stages {
    stage('Build Maven') {
      steps {
        bat """
            dir
            git log
            cd springboot-backend
            dir
            mvn clean install -DskipTests
        """.stripIndent().trim()
      }
    }
    stage('Build Spring Boot Backend Docker Image') {
      steps{
        bat """
            cd springboot-backend
            dir
            docker build -t clh7090/job-listings-springboot-backend .
        """.stripIndent().trim()
      }
    }
  }
}