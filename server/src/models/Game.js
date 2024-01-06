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
    turn: {
        type: String,
    },
});

gameSchema.pre("save", async function (next) {
    if (this.isNew) {
        this.turn = "white";
    } else {
        console.log("update turn");
        this.turn = this.turn === "white" ? "black" : "white";
    }

    next();
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
