const axios = require("axios")
const express = require("express");
const cors = require("cors")
const { randomBytes } = require("crypto")

const app = express();

app.use(express.json())
app.use(cors())

const comments = {}

app.get("/posts/:id/comments", (req, res) => {
    return res.json(comments[req.params.id] || []);
})
app.post("/posts/:id/comments", async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comment = comments[req.params.id] || []
    comment.push({
        commentId: id,
        content,
        status: 'pending'
    })
    comments[req.params.id] = comment

    await axios.post("http://localhost:4005/events", {
        type: 'CommentCreated',
        data: {
            id,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })
    return res.status(201).json(comment)
})

app.post("/events", async (req, res) => {
    console.log('Received Event: ', req.body.type);
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { id, postId, status, content } = data;
        const commentOfThisPost = comments[postId]
        const modifiedComment = commentOfThisPost.find(comm => {
            return comm.commentId === id;
        })
        modifiedComment.status = status

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
                content
            }
        })
    }

    return res.send({})
})

app.listen(4001, () => {
    console.log('post server started on 4001');
})