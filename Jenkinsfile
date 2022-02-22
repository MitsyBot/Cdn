pipeline {
  agent any
  environment {
    GITHUB_TOKEN=credentials('github-token')
    IMAGE_NAME='poluxtrail/cdn'
    IMAGE_VERSION='latest'
  }
  stages {

    stage('cleanup') {
      steps {
        sh 'docker system prune -a --volumes --force'
      }
    }
    stage('build image') {
      steps {
        sh 'docker build -t $IMAGE_NAME:$IMAGE_VERSION .'
      }
    }
    stage('login to GHCR') {
      steps {
        sh 'echo $GITHUB_TOKEN_PSW | docker login ghcr.io -u $GITHUB_TOKEN_USR --password-stdin'
      }
    }
    stage('tag image') {
      steps {
        sh 'docker tag $IMAGE_NAME:$IMAGE_VERSION ghcr.io/$IMAGE_NAME:$IMAGE_VERSION'
      }
    }
    stage('push image') {
      steps {
        sh 'docker push ghcr.io/$IMAGE_NAME:$IMAGE_VERSION'
      }
    }
    stage('Enviar para a maquina') {
          steps {
            script {
                  withCredentials([sshUserPrivateKey(credentialsId: 'ssh-credentials-id', keyFileVariable: 'identity', passphraseVariable: 'passWord', usernameVariable: 'userName')]) {
            def remote = [:]
            remote.name = 'vps'
            remote.host = '198.12.96.170'
            remote.user = userName
            remote.password = passWord
            remote.allowAnyHosts = true
            sshCommand remote: remote, command: "docker stop Cdn"
            sshCommand remote: remote, command: "docker rm Cdn"
            sshCommand remote: remote, command: "docker pull ghcr.io/poluxtrail/cdn:latest"
            sshCommand remote: remote, command: "docker run -it -d -p 8000:8000 -v cdn-data:/data/cdn --name Cdn ghcr.io/poluxtrail/cdn:latest"
            }
        }
      } 
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}
