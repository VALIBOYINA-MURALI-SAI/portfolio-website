pipeline {
  agent any

  environment {
    DOCKERHUB_REPO = "DOCKERHUB_USER/murali-portfolio" // replace before running, or set as Jenkins var
    IMAGE_TAG = "${env.BUILD_NUMBER ?: 'manual'}"
    K8S_NAMESPACE = "default"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Image') {
      steps {
        sh "docker build -t ${DOCKERHUB_REPO}:${IMAGE_TAG} ."
      }
    }

    stage('Docker Login & Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          sh "echo $DH_PASS | docker login -u $DH_USER --password-stdin"
          sh "docker push ${DOCKERHUB_REPO}:${IMAGE_TAG}"
        }
      }
    }

    stage('Deploy Green') {
      steps {
        // Replace image in green deployment and apply
        sh "kubectl set image deployment/portfolio-green portfolio=${DOCKERHUB_REPO}:${IMAGE_TAG} --namespace=${K8S_NAMESPACE}"
        sh "kubectl rollout status deployment/portfolio-green --namespace=${K8S_NAMESPACE} --timeout=120s"
      }
    }

    stage('Switch Traffic to Green') {
      steps {
        // Patch the service selector to point to green
        sh "kubectl patch service portfolio-service -p '{\"spec\":{\"selector\":{\"app\":\"portfolio\",\"version\":\"green\"}}}' --namespace=${K8S_NAMESPACE}"
      }
    }

    stage('Optional: Scale Down Blue') {
      steps {
        // After successful switch, scale down blue or keep for rollback
        sh "kubectl scale deployment portfolio-blue --replicas=0 --namespace=${K8S_NAMESPACE}"
      }
    }
  }

  post {
    success {
      echo "Deployment completed: ${DOCKERHUB_REPO}:${IMAGE_TAG}"
    }
    failure {
      echo "Pipeline failed — consider rolling back service to blue."
      // On failure, patch the service back to blue
      sh "kubectl patch service portfolio-service -p '{\"spec\":{\"selector\":{\"app\":\"portfolio\",\"version\":\"blue\"}}}' --namespace=${K8S_NAMESPACE}"
    }
  }
}
