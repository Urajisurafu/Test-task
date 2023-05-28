const express = require('express')
const cors = require('cors')
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1608084",
    key: "88afaa8e036ee3d60cb4",
    secret: "9793838d9d84266e6eaa",
    cluster: "eu",
    useTLS: true
});

const app = express();

app.use(cors({
    origin: ['http://localhost:4200']
}))

app.use(express.json())

app.post('/app/messages', async (req, res) => {
    await pusher.trigger("chat", "message", {
        username: req.body.username,
        message: req.body.message,
    });

    res.json([]);
})

console.log('listening to port 8000');
app.listen(8000);
