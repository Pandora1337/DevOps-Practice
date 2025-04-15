const express = require('express');
const consul = require('consul');

const app = express();
const consulClient = new consul({
    host: process.env.CONSUL_IP || 'localhost',
    port: parseInt(process.env.CONSUL_PORT) || 8500,
})

const NAME = process.env.SERVICE_NAME || "service-a"
const IP = process.env.SERVICE_IP || "localhost"
const PORT = parseInt(process.env.PORT) || 3000;
const POLL_INTERVAL = process.env.POLL_INTERVAL || "1s"

app.get('/info', (req, res) => {
    res.json({
        timestamp: new Date(),
        service: NAME,
    })
});

app.listen(PORT, () => {
    console.log(`${NAME} is running on http://${IP}:${PORT}`);

    consulClient.agent.service.register({
        name: NAME,
        port: PORT,
        address: IP,
        check: {
            http: `http://${IP}:${PORT}/info`,
            interval: POLL_INTERVAL,
        },
    });

    process.on('SIGINT', async () => {
        await consulClient.agent.service.deregister(NAME, () => {
            console.log(`${NAME} deregistered`);
        });
        await process.exit();
    });
});
