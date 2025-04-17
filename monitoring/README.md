# Monitoring with Prometheus and Grafana

In this project I demonstrate the setup for monitoring Linux server and Docker containers, using the following stack:

- Prometheus (Metric scraping)
- Grafana (Visualisation)
- Cadvisor (Docker metrics)
- node_exporter (Server metrics)
- Loki (Logs aggregation)
- Promtail (System logs scraper)

## Setup

1. Copy the directories to where you want to keep the configuration files. In `prometheus.yaml` you can add new scraping targets, or remove existing ones. Also adjust scrape intervals to your liking.
2. Define `.env` variables for Docker compose. I recommend using Portainer for this and next steps
3. Run `docker compose up -d` to start the compose file.
NOTE: For demonstration purposes, I binded a `port` to Prometheus, but it is best practice to NOT do that, as it doesnt have a secure connection by default. Grafana doesn't have HTTPS either, however you can put it (and even Prometheus) behind a reverse proxy or access control.
4. Connect to Grafana on port `9030` (`3000` by default) and login using username: `admin` and password: `admin`. Change the password for security.
5. In Grafana UI, add Prometheus as a data source. Since they are in the same docker-compose, and thus in the same Docker Network, you can simply type `http://prometheus:9090` in the URL field.
6. Add Loki data source on `http://loki:3100`
7. Add new dashboards. In the repository directory `grafana` I provide several examples of `dashboard.json` that you can import to Grafana straight away.

## Ports

You can change any port binding under `ports:`, as they are the 'external' access for your dashboard. Do not touch `expose:`, as they are for inter-container communication.