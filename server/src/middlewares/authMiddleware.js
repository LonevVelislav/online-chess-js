const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = process.env.SECRET;
const { promisify } = require("util");
const castError = require("../utils/castError");
const Game = require("../models/Game");

exports.protect = async (req, res, next) => {
    let token;

    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new Error("your not logged in! please log in to get access");
        }

        const decoded = await promisify(jwt.verify)(token, secret);
        const currentUser = await User.findById(decoded.id);

        if (!currentUser) {
            throw new Error(
                "the user belonging to the token does no longer exists"
            );
        }

        req.user = currentUser;
        console.log(req.user);

        next();
    } catch (err) {
        res.status(401).json({
            status: "fail",
            message: castError(err),
        });
    }
};
exports.restrictToPlayers = async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            throw new Error("game does not exist!");
        }
        if (
            req.user._id.toString() !== game.player1.toString() &&
            req.user._id.toString() !== game.player2.toString()
        ) {
            throw new Error("You are not playing in this game!");
        }
        next();
    } catch (err) {
        res.status(403).json({
            status: "fail",
            message: castError(err),
        });
    }
};
