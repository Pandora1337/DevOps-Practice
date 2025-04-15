# Service discovery with Consul

In this project I demonstrate a simple service discovery system with Consul, using a Node.js backend for gateway and services.

## Tech Stack:
 - Node.js
 - Express.js
 - Consul (`consul` npm package + Docker container)

## Running in Docker

You can see this project as a docker image [here](https://hub.docker.com/r/pandora1337/nodejs-service)

Download `docker-compose.yml` and run `docker-compose up -d`

## Running as-is

1. Download this directory
2. Run `npm i`
3. To start the gateway, run `npm start:gateway`
4. To start the service, run `npm start:service`
5. (Optional) To change settings, adjust them in code, or better yet, set them as environment variables:
```
      - CONSUL_IP=localhost # IP of Consul server. Default: localhost
      - CONSUL_PORT=8500 # Port of Consul server. Default: 8500
      - SERVICE_NAME=service-a # IP of Consul server. Default: service-a
      - SERVICE_IP=localhost # IP of Consul server. Default: localhost
      - PORT=3000 # IP of Consul server. Default: 3000
      - POLL_INTERVAL=1s  # For Consul healthcheck. Default: 1s
```

## Result

Now the services are reachable on `http://localhost:3001/info` (with port `3002` for `service-b`, `3003` for `service-c`, etc)
and via a gateway: `http://localhost:3000/service-a/info`, `http://localhost:3000/service-b/info`
Consul can also monitor all the services, and their API status

Docker containers with compose:

![docker](https://github.com/user-attachments/assets/a9da00ad-90dc-42d8-9eeb-54f8a46e27ea)

Consul dashboard showing service API status:

![consul-2](https://github.com/user-attachments/assets/59b0dca5-692b-4d9d-a907-862e0a3bb1ec)

Service endpoint:

![service](https://github.com/user-attachments/assets/5f6a7ac2-3b2c-4f5e-a0e2-fc6c81218eca)

Service endpoints through a gateway:

![gateway-2](https://github.com/user-attachments/assets/459e2c33-cf65-4d5b-81d8-363b87383616)
![gateway](https://github.com/user-attachments/assets/eb9e1646-d706-4ab1-a870-600dd6c07856)
