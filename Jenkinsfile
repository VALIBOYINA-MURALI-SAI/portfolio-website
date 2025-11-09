pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKER_IMAGE = "vms500/murali-portfolio"
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
                    def newTag = "v${env.BUILD_NUMBER}"
                    sh "docker build -t ${DOCKER_IMAGE}:${newTag} ."
                    sh "docker tag ${DOCKER_IMAGE}:${newTag} ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    def newTag = "v${env.BUILD_NUMBER}"
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push ${DOCKER_IMAGE}:${newTag}"
                        sh "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Blue-Green Deployment to Kubernetes') {
            steps {
                script {
                    echo "Deploying to Blue environment..."
                    sh "kubectl set image -f ${DEPLOYMENT_BLUE} portfolio=${DOCKER_IMAGE}:latest --local -o yaml | kubectl apply -f -"

                    echo "Verifying Blue deployment..."
                    sh "kubectl rollout status deployment/portfolio-blue"

                    echo "Switching Service to Blue deployment..."
                    sh "kubectl apply -f k8s/service.yaml"

                    echo "Blue deployment successful ✅"
                }
            }
        }
    }
}
