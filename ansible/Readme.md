# EC2 Configuration with Ansible

## Prerequisites

1. Ansible installed on the local machine
2. Remote Linux server (Homelab, local VM, or EC2) with SSH
3. Test website in a tarball (```website.tar.gz```)

### The Base role

- Updates system packages
- Installs ```fail2ban```

### The NGINX role

- Installs ```nginx```
- Starts and enables the Nginx service

### The APP role

- Copies the ```website.tar.gz``` to the server
- Extracts the tarball
- Deletes the tarball

## Procedure

1. To run the ansible playbook:
```
ansible-playbook -i inventory.yml setup.yml
```

2. To run specific roles, add the appropriate tag to the command:

```
ansible-playbook -i inventory.yml setup.yml --tags "app"
```

3. To configure the Terraform instance deployed from [here](https://github.com/Pandora1337/DevOps-Practice/tree/main/iac-terraform):

```
ansible-playbook -i ../iac-terraform/tr_inventory.yml setup.yml
```
