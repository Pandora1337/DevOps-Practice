# IaC with Terraform for AWS EC2

This project shows a simple Terraform configuration to deploy a public EC2 instance with a new key and inbound rules configued for HTTP and SSH.

# Steps

1. After installing Terraform, I put credentials for an IAM user into ```~/.aws/credentials```:
```
[default]
aws_access_key_id = <ACCESS KEY>
aws_secret_access_key = <SECRET KEY>
region = eu-central-1
```
2. ```terraform init``` will initialise the project files
3. ```terraform plan``` will show all steps that will be applied in the next step
4. ```terraform apply``` will deploy the ```main.tf``` configuration to AWS, output public IP, and create new key file for SSH

And now theres a EC2 instance deployed with Terraform!