const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    board: {
        type: Array,
    },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
