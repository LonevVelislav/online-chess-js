const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

app.use(cors());

require("dotenv").config();
const server = http.createServer(app);
const router = require("./router");

//websocket config
const io = new Server(server, {
    cors: {
        origin: "http://192.168.0.103:5173",
        methods: ["GET", "POST", "PATCH"],
    },
});
io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on("send_data", (data) => {
        socket.broadcast.emit("recieve_data", data);
    });
});

//config
app.use(express.json());

mongoose
    .connect(
        process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD_DB)
    )
    .then(() => console.log("DB connection successfull"))
    .catch((err) => console.log("Failed to connect to DB!"));

app.use("/", router);
app.use("*", (req, res) => {
    res.redirect("/404");
});

server.listen(process.env.PORT, () =>
    console.log(`app is running on port... ${process.env.PORT}`)
);
