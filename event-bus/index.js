const express = require("express");
const axios = require("axios");

const app = express()

app.use(express.json())

const events = []

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event)

    axios.post('http://posts-clusterip-srv:4000/events', event)
    axios.post('http://comments-srv:4001/events', event)
    axios.post('http://query-srv:4002/events', event)
    axios.post('http://moderation-srv:4003/events', event)

    return res.json({ status: "ok" })
})

app.get('/events', (req, res) => {
    return res.json(events)
})

app.listen(4005, () => {
    console.log('event server listening on 4005');
})