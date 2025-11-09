pipeline {
    agent any

    environment {
        DOCKER_REPO = "vms500/murali-portfolio"
        DEPLOYMENT_BLUE = "k8s/deployment-blue.yaml"
        DEPLOYMENT_GREEN = "k8s/deployment-green.yaml"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/VALIBOYINA-MURALI-SAI/portfolio-website.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Dynamic tag based on Jenkins build number
                    IMAGE_TAG = "v${env.BUILD_NUMBER}"
                    sh """
                        docker build -t ${DOCKER_REPO}:${IMAGE_TAG} .
                        docker tag ${DOCKER_REPO}:${IMAGE_TAG} ${DOCKER_REPO}:latest
                    """
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh """
                            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                            docker push ${DOCKER_REPO}:${IMAGE_TAG}
                            docker push ${DOCKER_REPO}:v8
                        """
                    }
                }
            }
        }

        stage('Blue-Green Deployment to Kubernetes') {
            steps {
                script {
                    echo "Deploying image tag ${IMAGE_TAG} to Blue..."
                    sh """
                        kubectl set image -f ${DEPLOYMENT_BLUE} portfolio=${DOCKER_REPO}:${IMAGE_TAG} --local -o yaml | kubectl apply -f -
                        kubectl rollout status deployment/portfolio-blue
                        kubectl apply -f k8s/service.yaml
                    """
                    echo "✅ Blue deployment successful!"
                }
            }
        }
    }
}
