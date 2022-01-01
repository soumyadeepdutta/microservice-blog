const axios = require("axios")
const express = require("express");
const cors = require("cors")
const { randomBytes } = require("crypto")

const app = express();

app.use(express.json())
app.use(cors())

const posts = {}

app.get("/posts", (req, res) => {
    return res.json(posts);
})
app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    }
    // raise an event
    // using clusterip service to send data
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    })

    return res.status(201).json(posts[id])
})

app.post("/events", (req, res) => {
    console.log('Received Event', req.body.type);
    return res.send({})
})

app.listen(4000, () => {
    console.log('v55');
    console.log('post server started on 4000');
})