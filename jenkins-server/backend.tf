terraform {
  required_providers {
    aws={
        source  = "hashicorp/aws"
        version = "5.62.0"
    }
  }

  backend "s3" {
        region ="us-east-1"
        key    = "tf-backend.tfstate"
        bucket = "terraform-backend-for-jenkins"
    }
}