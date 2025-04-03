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

Note: To generate new keys for each instance, rename ```main_with_key.tf.txt``` to ```main.tf``` (Warning, this might exceed Free Tier if requested often!)

And now theres a EC2 instance deployed with Terraform!
![Screenshot from 2025-04-01 22-43-52](https://github.com/user-attachments/assets/741caefc-22c5-418a-86be-067c195db15d)
![Screenshot from 2025-04-01 23-06-59](https://github.com/user-attachments/assets/03e5fbb1-0911-4a99-bd21-b8ef1594d6ca)

5. (Optional) Generate new keys on instance deployment.
Add the following code:
```
# Creates new key on AWS
resource "aws_key_pair" "testkey" {
  key_name = "testkey"
  public_key = tls_private_key.rsa.public_key_openssh
}

resource "tls_private_key" "rsa" {
  algorithm = "RSA"
  rsa_bits = 4096
}

# Create a key file with correct permissions for SSH login
resource "local_file" "privatekey" {
  content = tls_private_key.rsa.private_key_pem
  filename = "NewKey.pem"
  file_permission = "0400"
}
```

And modify ```testinstance``` and ```ansible_inventory``` resources to use the generated keyname and keyfile, like so:

```
resource "aws_instance" "testinstance" {
  ami           = "ami-0bade3941f267d2b8"
  instance_type = "t2.micro"
  key_name = aws_key_pair.testkey.key_name # <= Use new key name!
  vpc_security_group_ids = [aws_security_group.testgroup.id]

  tags = {
    Name = "MyEC2Instance"
  }
}

# Save to a file the populated template with instance data, for use with Ansible
resource "local_file" "ansible_inventory" {
  content = templatefile("tr_inventory.yml.tpl", {
    instance_name = aws_instance.testinstance.tags["Name"]
    instance_ip = aws_instance.testinstance.public_ip
    instance_key = local_file.privatekey.filename # <= Use new key filename!
  })
  
  filename = "tr_inventory.yml"
}
```
