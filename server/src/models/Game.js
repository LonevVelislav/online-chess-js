const mongoose = require("mongoose");
const server = require("../index.js");

const gameSchema = new mongoose.Schema({
    board: [[{ type: Object }]],
    player1: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    player2: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    turn: {
        type: String,
    },
    host: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
});

gameSchema.pre("save", async function (next) {
    if (this.isNew) {
        this.turn = "white";
    } else {
        this.turn = this.turn === "white" ? "black" : "white";
    }

    next();
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
