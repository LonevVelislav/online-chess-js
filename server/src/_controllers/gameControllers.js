const router = require("express").Router();
const Game = require("../models/Game");
const User = require("../models/User");

const {
    protect,
    restrictToPlayers,
    restrctToHost,
} = require("../middlewares/authMiddleware");
const castError = require("../utils/castError");

router.get("/", async (req, res) => {
    const games = await Game.find().populate("player1").populate("player2");

    try {
        res.status(200).json({
            status: "success",
            results: games.length,
            data: {
                games,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: castError(err),
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const game = await Game.findById(req.params.id)
            .populate("player1")
            .populate("player2");
        res.status(200).json({
            status: "success",
            data: {
                game,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: castError(err),
        });
    }
});

router.post("/", protect, async (req, res) => {
    try {
        if (req.body.board) {
            throw new Error("invalid data! cant post your own boards!");
        }

        if (req.user.playing) {
            throw new Error("you are in a game!");
        }
        const newGame = await Game.create({
            board: [
                [
                    { id: "rook1", url: "/img/peaces/rook.png", type: "black" },
                    {
                        id: "knight1",
                        url: "/img/peaces/knight.png",
                        type: "black",
                    },
                    {
                        id: "bishop1",
                        url: "/img/peaces/bishop.png",
                        type: "black",
                    },
                    {
                        id: "queen",
                        url: "/img/peaces/queen.png",
                        type: "black",
                    },
                    { id: "king", url: "/img/peaces/king.png", type: "black" },
                    {
                        id: "bishop2",
                        url: "/img/peaces/bishop.png",
                        type: "black",
                    },
                    {
                        id: "knight2",
                        url: "/img/peaces/knight.png",
                        type: "black",
                    },
                    { id: "rook2", url: "/img/peaces/rook.png", type: "black" },
                ],
                [
                    {
                        id: "pawn1",
                        url: "/img/peaces/pawn.png",
                        type: "black",
                        turn: 0,
                    },
                    {
                        id: "pawn2",
                        url: "/img/peaces/pawn.png",
                        type: "black",
                        turn: 0,
                    },
                    {
                        id: "pawn3",
                        url: "/img/peaces/pawn.png",
                        type: "black",
                        turn: 0,
                    },
                    {
                        id: "pawn4",
                        url: "/img/peaces/pawn.png",
                        type: "black",
                        turn: 0,
                    },
                    {
                        id: "pawn5",
                        url: "/img/peaces/pawn.png",
                        type: "black",
                        turn: 0,
                    },
                    {
                        id: "pawn6",
                        url: "/img/peaces/pawn.png",
                        type: "black",
                        turn: 0,
                    },
                    {
                        id: "pawn7",
                        url: "/img/peaces/pawn.png",
                        type: "black",
                        turn: 0,
                    },
                    {
                        id: "pawn8",
                        url: "/img/peaces/pawn.png",
                        type: "black",
                        turn: 0,
                    },
                ],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [
                    {
                        id: "PAWN1",
                        url: "/img/peaces/PAWN.png",
                        type: "white",
                        turn: 0,
                    },
                    {
                        id: "PAWN2",
                        url: "/img/peaces/PAWN.png",
                        type: "white",
                        turn: 0,
                    },
                    {
                        id: "PAWN3",
                        url: "/img/peaces/PAWN.png",
                        type: "white",
                        turn: 0,
                    },
                    {
                        id: "PAWN4",
                        url: "/img/peaces/PAWN.png",
                        type: "white",
                        turn: 0,
                    },
                    {
                        id: "PAWN5",
                        url: "/img/peaces/PAWN.png",
                        type: "white",
                        turn: 0,
                    },
                    {
                        id: "PAWN6",
                        url: "/img/peaces/PAWN.png",
                        type: "white",
                        turn: 0,
                    },
                    {
                        id: "PAWN7",
                        url: "/img/peaces/PAWN.png",
                        type: "white",
                        turn: 0,
                    },
                    {
                        id: "PAWN8",
                        url: "/img/peaces/PAWN.png",
                        type: "white",
                        turn: 0,
                    },
                ],
                [
                    { id: "ROOK1", url: "/img/peaces/ROOK.png", type: "white" },
                    {
                        id: "KNIGHT1",
                        url: "/img/peaces/KNIGHT.png",
                        type: "white",
                    },
                    {
                        id: "BISHOP1",
                        url: "/img/peaces/BISHOP.png",
                        type: "white",
                    },
                    {
                        id: "QUEEN",
                        url: "/img/peaces/QUEEN.png",
                        type: "white",
                    },
                    { id: "KING", url: "/img/peaces/KING.png", type: "white" },
                    {
                        id: "BISHOP2",
                        url: "/img/peaces/BISHOP.png",
                        type: "white",
                    },
                    {
                        id: "KNIGHT2",
                        url: "/img/peaces/KNIGHT.png",
                        type: "white",
                    },
                    { id: "ROOK2", url: "/img/peaces/ROOK.png", type: "white" },
                ],
            ],
            player1: req.user._id,
            host: req.user._id,
        });
        await User.findByIdAndUpdate(
            req.user._id,
            {
                playing: true,
            },
            {
                runValidators: true,
                new: true,
            }
        );

        res.status(200).json({
            status: "success",
            data: {
                newGame,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: castError(err),
        });
    }
});

router.post("/join/:id", protect, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            throw new Error("game does no longer exist!");
        }

        if (req.user._id.toString() === game.player1.toString()) {
            throw new Error("cant play by ourself.");
        }
        if (req.user.playing) {
            throw new Error("your are in a game!");
        }

        if (game.player2 === undefined && req.user._id !== game.player1) {
            game.player2 = req.user;
            await User.findByIdAndUpdate(
                req.user._id,
                {
                    playing: true,
                },
                {
                    runValidators: true,
                    new: true,
                }
            );

            await game.save();
        }
        res.status(200).json({
            status: "success",
            data: {
                game,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: castError(err),
        });
    }
});

router.post("/disconnect/:id", protect, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            throw new Error("game does no longer exist!");
        }
        game.player2 = undefined;
        await User.findByIdAndUpdate(
            req.user._id,
            {
                playing: false,
            },
            { runValidators: true, new: true }
        );

        await game.save();

        res.status(200).json({
            status: "success",
            data: {
                game,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: castError(err),
        });
    }
});

router.patch("/move/:id", protect, restrictToPlayers, async (req, res) => {
    try {
        let filteredObject = {};
        Object.keys(req.body).forEach((el) => {
            if (el !== "board" && el !== "turn") {
                throw new Error(
                    "invalid data, can only change board and turn elements!"
                );
            }
            filteredObject[el] = req.body[el];
        });

        const game = await Game.findByIdAndUpdate(
            req.params.id,
            { ...filteredObject },
            {
                new: true,
                runValidators: true,
            }
        )
            .populate("player1")
            .populate("player2");
        if (!game) {
            throw new Error("game does not exist!");
        }
        await game.save();

        res.status(200).json({
            status: "success",
            data: {
                game,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: castError(err),
        });
    }
});

router.delete("/:id", protect, restrctToHost, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        const player1 = await User.findById(game.player1);
        const player2 = await User.findById(game.player2);
        player1.playing = false;
        await player1.save();
        if (player2) {
            player2.playing = false;
            await player2.save();
        }
        await Game.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: castError(err),
        });
    }
});

module.exports = router;
