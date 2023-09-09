pipeline {
  agent any
  tools {
    maven 'maven_3_9_4'
    nodejs 'node'
  }
  stages {
    stage('Build Maven') {
      steps {
        sh 'mvn clean install'
      }
    }
  }
}