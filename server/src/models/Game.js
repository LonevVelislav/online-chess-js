const mongoose = require("mongoose");

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
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
