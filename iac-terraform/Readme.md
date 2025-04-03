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

Note: To generate new keys for each instance, rename ```main_with_key.tf``` to ```main.tf```, and replace ```testinstance.pem``` with your own key file name (Warning, this might exceed Free Tier)

And now theres a EC2 instance deployed with Terraform!
![Screenshot from 2025-04-01 22-43-52](https://github.com/user-attachments/assets/741caefc-22c5-418a-86be-067c195db15d)
![Screenshot from 2025-04-01 23-06-59](https://github.com/user-attachments/assets/03e5fbb1-0911-4a99-bd21-b8ef1594d6ca)
