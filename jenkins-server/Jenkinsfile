properties([
    parameters([
        string(
            defaultValue: 'dev',
            name: 'Environment'
        ),
        choice(
            choices: ['plan', 'apply', 'destroy'], 
            name: 'Terraform_Action'
        )])
])
pipeline {
    agent any
    stages {
        stage('Preparing') {
            steps {
                sh 'echo Preparing'
            }
        }
        stage('Git Pulling') {
            steps {
                git branch: 'main', url: 'https://github.com/radhe203/devopsified2.git'
            }
        }
        stage('Init') {
            steps {
               withAWS(credentials: 'aws-creds', region: 'us-east-1') {
                    dir('awseks') { 
                        sh 'terraform init' 
                    }
                }
            }
        }
        stage('Validate') {
            steps {
                withAWS(credentials: 'aws-creds', region: 'us-east-1') {
                    dir('awseks') { 
                        sh 'terraform validate' 
                    }
                }
            }
        }
        stage('Action') {
            steps {
                withAWS(credentials: 'aws-creds', region: 'us-east-1') {
                    script {    
                        if (params.Terraform_Action == 'plan') {
                             dir('awseks') { 
                                 sh 'terraform plan --auto-approve' 
                               }
                        }   else if (params.Terraform_Action == 'apply') {
                             dir('awseks') { 
                                sh 'terraform apply --auto-approve' 
                            }
                        }   else if (params.Terraform_Action == 'destroy') {
                             dir('awseks') { 
                                sh 'terraform destroy --auto-approve' 
                            }
                        } else {
                            error "Invalid value for Terraform_Action: ${params.Terraform_Action}"
                        }
                    }
                }
            }
        }
    }
}
