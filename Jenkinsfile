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
                    // Create a new tag based on Jenkins build number
                    IMAGE_TAG = "v${env.BUILD_NUMBER}"

                    echo "Building image: ${DOCKER_REPO}:${IMAGE_TAG}"
                    sh """
                        docker build -t ${DOCKER_REPO}:${IMAGE_TAG} .
                        docker tag ${DOCKER_REPO}:${IMAGE_TAG} ${DOCKER_REPO}:latest
                    """
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        def newTag = "v${env.BUILD_NUMBER}"
                        sh """
                            echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
                            docker push vms500/murali-portfolio:latest
                        """
                    }
                }
            }
        }

        stage('Blue-Green Deployment to Kubernetes') {
            steps {
                script {
                    echo "Deploying image vms500/murali-portfolio:${IMAGE_TAG} to Blue environment..."
                    sh """
                        kubectl set image -f k8s/deployment-blue.yaml portfolio=vms500/murali-portfolio:latest --local -o yaml | kubectl apply -f -
                        kubectl rollout status deployment/portfolio-blue
                        kubectl apply -f k8s/service.yaml
                    """
                    echo "✅ Blue deployment successful!"
                }
            }
        }
    }
}
