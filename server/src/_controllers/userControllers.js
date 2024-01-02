const router = require("express").Router();

const User = require("../models/User");
const castError = require("../utils/castError");
const { createAndSendToken } = require("../utils/userToken");

router.post("/register", async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        createAndSendToken(newUser, 200, res);
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: castError(err),
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error("pleace provide username and password");
        }
        const user = await User.findOne({ username }).select("+password");
        if (!user || !(await user.correntPassword(password, user.password))) {
            throw new Error("invalid username or password");
        }
        createAndSendToken(user, 200, res);
    } catch (err) {
        res.status(401).json({
            status: "fail",
            message: castError(err),
        });
    }
});

module.exports = router;
