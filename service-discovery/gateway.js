const express = require('express');
const consul = require('consul');
const axios = require('axios');

const app = express();
const consulClient = new consul({
    host: process.env.CONSUL_IP || 'localhost',
    port: process.env.CONSUL_PORT || 8500,
    promisify: true,
})

const IP = process.env.SERVICE_IP || "localhost"
const PORT = process.env.PORT || 3001;

app.get('/:service/info', async (req, res) => {
    const serviceName = req.params.service

    try {
        const services = await consulClient.catalog.service.nodes(serviceName)

        if (!services || services.length == 0) {
            console.log(`Service ${serviceName} not found in Consul`)
            res.status(404).json({ error: `${serviceName} not found` })
            return
        }

        const service = services[0]
        const serviceUrl = `http://${service.ServiceAddress}:${service.ServicePort}/info`
        console.log(`Call service at: ${serviceUrl}`)

        const response = await axios.get(serviceUrl)
        res.json(response.data)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.toString() })
    }
});

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://${IP}:${PORT}`);
});
