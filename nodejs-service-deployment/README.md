# Node.js Service Deployment

In this demo project, I demonstrate a nodejs service deployment on EC2 instance with these functions:

1. Manual setup and update with Ansible
2. Automatic updates with Actions

## Steps
1. For a server instance and Ansible inventory, I used Terraform code from [here](https://github.com/Pandora1337/DevOps-Practice/tree/main/iac-terraform)
2. Copy the ssh key, and server IP to GitHub secrets
3. To set up the server manually, run `ansible-playbook -i ../iac-terraform/tr_inventory.yml ansible/node_setup.yml`
4. Now, any changes to this directory will push the changes to the server using GitHub Actions and [this workflow](https://github.com/Pandora1337/DevOps-Practice/blob/main/.github/workflows/nodejs-deployment.yml), and for any changes you want to apply from local files, just run `ansible-playbook -i ../iac-terraform/tr_inventory.yml ansible/node_setup.yml --tags app`
