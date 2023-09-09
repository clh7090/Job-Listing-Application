pipeline {
  agent any
  tools {
    maven '3.9.4'
    nodejs '20.6.1;
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
    stage('Build Maven') {
      steps {
        bat """
            cd react-frontend
            npm i
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
  }
}
