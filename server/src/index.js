const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const app = express();
const PORT = process.env.PORT || 3030;

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

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_player_data", (data) => {
        socket.to(data.room).emit("recieve_player_data", data);
    });

    socket.on("send_game", (data) => {
        socket.to(data.room).emit("recieve_game", data);
    });
    socket.on("send_game_message", (data) => {
        socket.to(data.room).emit("recieve_game_message", data);
    });

    socket.on("send_message", (data) => {
        socket.broadcast.emit("recieve_message", data);
    });
});

//config
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose
    .connect(process.env.DATABASE.replace("<PASSWORD>", PORT))
    .then(() => console.log("DB connection successfull"))
    .catch((err) => console.log("Failed to connect to DB!"));

app.use("/", router);
app.use("*", (req, res) => {
    res.redirect("/404");
    cd;
});

server.listen(process.env.PORT, () =>
    console.log(`app is running on port... ${process.env.PORT}`)
);
