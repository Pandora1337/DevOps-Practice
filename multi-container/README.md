# Multi-container application

In this project I demonstrate and document deployment of an API backend with a database, using Docker compose and GitHub Actions for CI/CD.

## Tech stack:
 - Node.js
 - expressjs
 - MongoDB
 - Docker + Compose
 - GitHub Actions

## Project structure

```
DevOps-Practice/
│
├── .github/workflows/
│   └── multi-container-application.yml   # Builds image on new pushes and pulls it on the server
│
└── multi-container/
    ├── ansible/
    │   ├── roles/                        # Directory containing different Ansible roles for setup
    │   └── docker_setup.yml              # Playbook for server setup with docker, compose, and api
    │
    ├── api/                              # Source code for the application’s API
    │   ├── backend.js                    # Main backend Node.js file for the API
    │   ├── package-lock.json
    │   ├── package.json
    │   └── Dockerfile                    # Dockerfile to build a Docker image for the API
    │
    ├── .env                              # Environment variables for configuration (e.g., database URLs, API keys)
    ├── docker-compose.yml                # Docker Compose configuration for orchestrating multi-container setup
    └── README.md
```

## Setup

1. Provision a server. I showed how to use Terraform [here](https://github.com/Pandora1337/DevOps-Practice/tree/main/iac-terraform)
2. If you want to use your own api, build image:
```
docker build -t <your username>/<your image name>:latest ./api/
```
and push it:
```
docker push <your username>/<your image name>:latest
```
3. Run the Ansible playbook for the first-time setup:
```
ansible-playbook -i ../iac-terraform/tr_inventory.yml ansible/docker_setup.yml
```
If you want to just setup docker and compose:
```
ansible-playbook -i ../iac-terraform/tr_inventory.yml ansible/docker_setup.yml --skip-tags app
```
and if you want to update `docker-compose.yml`:
```
ansible-playbook -i ../iac-terraform/tr_inventory.yml ansible/docker_setup.yml --tags app
```
4. Any changes to this repository will be included in a docker image and pushed automatically using this [workflow](https://github.com/Pandora1337/DevOps-Practice/blob/main/.github/workflows/multi-container-application.yml)

## Result:

Now you can perform GET, PUT, POST, and DElETE API requests to the server running the container and database, ripe for a nice frontend! *wink wink*
See all possible API requests [here](https://github.com/Pandora1337/DevOps-Practice/tree/main/multi-container/api)

After I implemented new API feature and pushed it to GitHub, the Action build, pushed and updated Docker image on the server. An excellent example of CI/CD:

From:

To:

## Explanations
### Github Workflow
This Action will build a new Docker image, push it to Docker Hub. Then, it will SSH into the remote server, update `docker-compose.yml` file and run it, pruning any leftovers.
Now, I *could* have used the playbook here like in [my nodejs deployment](https://github.com/Pandora1337/DevOps-Practice/tree/main/nodejs-service-deployment), but I wanted to try SSH approach instead.

### Ansible
I made this playbook as flexible as possible: the `docker` role only installs docker and docker-compose, and `app` updates `docker-compose.yml` and runs it, just like the github action.