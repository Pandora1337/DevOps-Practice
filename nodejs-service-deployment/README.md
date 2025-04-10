# Node.js Service Deployment

In this demo project, I demonstrate set up of a CI/CD pipeline for a Node.js service using GitHub Actions. This will practice GitHub Actions for deployment (including Secrets and environment variables), Terraform to provision a server, Ansible to configure the server, and SSH to deploy the application.

These will be functional by the end of the project:

1. First-time setup and update with Ansible
2. Automatic updates with Actions

## Steps
1. For a server instance and Ansible inventory, I used Terraform code from [here](https://github.com/Pandora1337/DevOps-Practice/tree/main/iac-terraform)
2. Copy the ssh key, user, and server IP to GitHub secrets
3. To do first time setup, run `ansible-playbook -i ../iac-terraform/tr_inventory.yml ansible/node_setup.yml`
4. Now, any changes to this directory will push the changes to the server using GitHub Actions and [this workflow](https://github.com/Pandora1337/DevOps-Practice/blob/main/.github/workflows/nodejs-deployment.yml), and for any changes you want to apply from local files, just run `ansible-playbook -i ../iac-terraform/tr_inventory.yml ansible/node_setup.yml --tags app`

## Flexibility
Now that there is a Node.js service running, more can be configured (and optionally manually updated) with Ansible, as well as continuously deployed from the repository using Actions. The neat part is that the Actions use the very same Ansible playbook, so to make changes to the service and its deployment, you just need to update the playbook. Actions will use the new playbook on next run.
