terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  profile = "default"
  region  = "eu-central-1"
}

resource "aws_security_group" "testgroup" {
  name        = "testgroup"
  description = "Allow HTTP and SSH traffic"
  
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_instance" "testinstance" {
  ami           = "ami-0bade3941f267d2b8"
  instance_type = "t2.micro"
  key_name = aws_key_pair.testkey.key_name
  vpc_security_group_ids = [aws_security_group.testgroup.id]

  tags = {
    Name = "MyEC2Instance"
  }
}

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

# Save to a file the populated template with instance data, for use with Ansible
resource "local_file" "ansible_inventory" {
  content = templatefile("tr_inventory.yml.tpl", {
    instance_name = aws_instance.testinstance.tags["Name"]
    instance_ip = aws_instance.testinstance.public_ip
    instance_key = local_file.privatekey.filename
  })
  
  filename = "tr_inventory.yml"
}

# Shows the public IP
output "instance_ip" {
  value = aws_instance.testinstance.public_ip
}
