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

Now the services are reachable on `http://localhost:3001/info` (with port `3002` for `service-b`, `3003` for `service-c`, etc) and via a gateway: `http://localhost:3000/service-a/info`.

Consul can also see all the services, and their api status